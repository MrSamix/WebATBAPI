using Microsoft.AspNetCore.Http;

namespace Core.Models.Auth;

public class AuthRegistrationModel
{
    public string Email { get; set; }
    public string Password { get; set; }
    public IFormFile? Image { get; set; }
}
