using E_Commerce_App.Models;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce_App.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task<User> AddUserAsync(User user);// Add method for user registration
    }
}
