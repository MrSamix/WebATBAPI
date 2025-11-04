using Microsoft.AspNetCore.Http;

namespace Core.Models.Account;

public class AccountItemModel
{
    public int Id { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string Email { get; set; }
    public string Password { get; set; }
    public string? Image { get; set; }
}
