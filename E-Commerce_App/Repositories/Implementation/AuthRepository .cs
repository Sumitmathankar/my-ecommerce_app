using E_Commerce_App.Models;
using E_Commerce_App.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce_App.Repositories.Implementation
{
    public class AuthRepository : IAuthRepository
    {
        private readonly EcommerceDbContext _context;

        public AuthRepository(EcommerceDbContext context)
        {
            _context = context;
        }

        public async Task<User> AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
