using Microsoft.AspNetCore.Identity;

namespace backend.Classes
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; } = string.Empty;
    }
}
