using E_Commerce_App.DTOs.Auth;
using E_Commerce_App.Services.Interface;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace E_Commerce_App.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(UserRegisterDTO userDto)
        {
            var registeredUser = await _authService.Register(userDto);
            if (registeredUser == null)
                return Conflict("User already exists");

            return Ok(registeredUser); // Includes JWT token
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginRequestDTO loginDto)
        {
            var user = await _authService.Login(loginDto);
            if (user == null)
                return Unauthorized("Invalid email or password");

            return Ok(user); // Includes JWT token
        }

    }
}
