using System.ComponentModel.DataAnnotations;

namespace backend.Records
{
    public class AccountLoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }


    public class AccountNewUserDto
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
    }

    public class AccountRegisterDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? ConfirmPassword { get; set; }
    }

    public class UpdateProfileDto
    {
        [Required]
        public string FullName { get; set; } = string.Empty;
    }

    public class ResetPasswordDto
    {
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }

    public class ChangePasswordDto
    {
        public string CurrentPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }

    public class ConfirmEmailDto
    {
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
    }

    public class RefreshTokenDto
    {
        public string ExpiredToken { get; set; } = string.Empty;
    }
}