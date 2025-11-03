using Microsoft.AspNetCore.Http;

namespace Core.Models.Account;

public class AccountItemModel
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public IFormFile? Image { get; set; }
}
