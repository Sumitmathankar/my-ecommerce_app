using E_Commerce_App.DTOs.Auth;
using E_Commerce_App.Repositories.Interfaces;
using E_Commerce_App.Services.Interface;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using E_Commerce_App.Models;

namespace E_Commerce_App.Services.Implmentation
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _config;

        public AuthService(IAuthRepository authRepository, IConfiguration config)
        {
            _authRepository = authRepository;
            _config = config;
        }


        public async Task<UserDTO?> Register(UserRegisterDTO userDto)
        {
            var existingUser = await _authRepository.GetUserByEmailAsync(userDto.Email);
            if (existingUser != null)
                return null; // already exists

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            var newUser = new User
            {
                FullName = userDto.FullName,
                Email = userDto.Email,
                PasswordHash = passwordHash,
                Role = "User",
                PhoneNumber = userDto.PhoneNumber,
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await _authRepository.AddUserAsync(newUser);

            // Generate token
            var token = GenerateJwtToken(createdUser);

            return new UserDTO
            {
                UserId = createdUser.UserId,
                FullName = createdUser.FullName,
                Email = createdUser.Email,
                PhoneNumber = createdUser.PhoneNumber,
                Role = createdUser.Role,
                Token = token
            };
        }

        public async Task<UserDTO?> Login(LoginRequestDTO loginDto)
        {
            var user = await _authRepository.GetUserByEmailAsync(loginDto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                return null;

            var token = GenerateJwtToken(user);

            return new UserDTO
            {
                UserId = user.UserId,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                Token = token
            };
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim("id", user.UserId.ToString()),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}


