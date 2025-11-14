namespace E_Commerce_App.DTOs.Auth
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }

    public class UserRegisterDTO
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }   // plain password (will be hashed)
        public string PhoneNumber { get; set; } 
    }
}
