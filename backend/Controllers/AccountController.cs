using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Classes;
using backend.Interfaces;
using backend.Records;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<AppUser> userManager,
            ITokenService tokenService,
            SignInManager<AppUser> signInManager,
            IConfiguration configuration
        )
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterAsync(AccountRegisterDto register)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest();

                if (register.Password != register.ConfirmPassword) BadRequest("Password must match!");

                if (!await IsEmailAvailableAsync(register.Email)) return BadRequest();

                var appUser = new AppUser
                {
                    FullName = register.Username,
                    UserName = register.Username,
                    Email = register.Email
                };

                var createdUser = await _userManager.CreateAsync(appUser, register.Password!);

                if (!createdUser.Succeeded) return BadRequest(createdUser.Errors);

                await _userManager.AddToRoleAsync(appUser, "User");

                var user = new AccountNewUserDto
                {
                    Username = appUser.UserName,
                    Email = appUser.Email,
                    Token = _tokenService.CreateToken(appUser)
                };

                return Ok(user);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error registering the user: {e.Message} - {e.StackTrace}");
                return BadRequest();
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginAsync(AccountLoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest();

                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);

                if (user is null) return BadRequest();

                var result = await _signInManager.CheckPasswordSignInAsync(
                    user,
                    loginDto.Password,
                    true
                );

                if (!result.Succeeded) return Unauthorized("Email and or password incorrect.");

                var userDto = new AccountNewUserDto
                {
                    Email = user.Email!,
                    Username = user.UserName!,
                    Token = _tokenService.CreateToken(user)
                };

                return Ok(userDto);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error logging the user: {e.Message} - {e.StackTrace}");
                return BadRequest();
            }
        }

        [HttpPost("logout")]
        public async Task<ActionResult> LogoutAsync()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<ActionResult> GetProfileAsync()
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null) return BadRequest();

            return Ok(new { user.FullName, user.Email });
        }

        [Authorize]
        [HttpPut("manage-profile")]
        public async Task<ActionResult> ManageProfileAsync(UpdateProfileDto dto)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null) return BadRequest();

            user.FullName = dto.FullName;

            var result = await _userManager.UpdateAsync(user);

            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPasswordAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user is null) return BadRequest();

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            
            // Send token to email...

            return Ok(new { token });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPasswordAsync(ResetPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null) return BadRequest();

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);

            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }

        [Authorize]
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordDto model)
        {
            var user = await _userManager.GetUserAsync(User);

            if (user is null) return BadRequest();

            var result = await _userManager.ChangePasswordAsync(
                user,
                model.CurrentPassword,
                model.NewPassword
            );

            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }

        [HttpPost("send-email-confirmation")]
        public async Task<IActionResult> SendEmailConfirmationAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return BadRequest();

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            
            // Send token to email

            return Ok(new { token });
        }

        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmailAsync(ConfirmEmailDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null) return NotFound();

            var result = await _userManager.ConfirmEmailAsync(user, model.Token);

            return result.Succeeded ? Ok() : BadRequest(result.Errors);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshTokenAsync(RefreshTokenDto model)
        {
            var principal = GetPrincipalFromExpiredToken(model.ExpiredToken);

            if (principal == null) return BadRequest("Token inválido");

            var username = principal.Identity?.Name;

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return BadRequest("Usuário não encontrado");

            // Generate new token
            var newToken = _tokenService.CreateToken(user);

            return Ok(new { Token = newToken });
        }

        private async Task<bool> IsEmailAvailableAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            return user is null ? true : false;
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = _configuration["JWT:Issuer"],
                ValidateAudience = true,
                ValidAudience = _configuration["JWT:Audience"],
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["JWT:SigningKey"]!)
                ),
                ValidateLifetime = false // Importante: permite tokens expirados
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var principal = tokenHandler.ValidateToken(
                    token,
                    tokenValidationParameters,
                    out SecurityToken securityToken
                );

                if (securityToken is not JwtSecurityToken jwtToken || 
                    !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha512Signature, StringComparison.InvariantCultureIgnoreCase)
                )
                {
                    return null;
                }

                return principal;
            }
            catch
            {
                return null;
            }
        }
    }
}
