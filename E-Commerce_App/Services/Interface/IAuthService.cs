using E_Commerce_App.DTOs.Auth;

namespace E_Commerce_App.Services.Interface
{
    public interface IAuthService
    {
        Task<UserDTO?> Login(LoginRequestDTO loginDto);
        Task<UserDTO?> Register(UserRegisterDTO userDto);
    }
}
