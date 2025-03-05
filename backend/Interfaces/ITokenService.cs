using backend.Classes;

namespace backend.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser appUser);
    }
}
