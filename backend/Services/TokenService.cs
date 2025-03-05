using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Classes;
using backend.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly SymmetricSecurityKey _symmetricSecurityKey;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;

            // The SigningKey must have at least 64 characters due to SecurityAlgorithms.HmacSha512Signature
            var signingKey = _configuration["JWT:SigningKey"] ?? throw new InvalidOperationException("JWT:SigningKey isn't configured.");

            _symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
        }

        public string CreateToken(AppUser appUser)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, appUser.Email!),
                new Claim(JwtRegisteredClaimNames.GivenName, appUser.UserName!),
                new Claim(ClaimTypes.NameIdentifier, appUser.Id),
                new Claim(ClaimTypes.Name, appUser.FullName)
            };

            var credentials = new SigningCredentials(
                _symmetricSecurityKey,
                SecurityAlgorithms.HmacSha512Signature
            );

            var tokenExpirationMinutes = _configuration.GetValue("JWT:ExpirationInMinutes", 60);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(tokenExpirationMinutes),
                SigningCredentials = credentials,
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
