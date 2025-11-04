using System.Text.Json.Serialization;

namespace Core.Models.Account;

public class AccountGoogleModel
{
    [JsonPropertyName("id")]
    public string GoogleId { get; set; } = "";
    [JsonPropertyName("email")]
    public string Email { get; set; } = "";

    [JsonPropertyName("given_name")]
    public string FirstName { get; set; } = "";
    [JsonPropertyName("family_name")]
    public string LastName { get; set; } = "";
    [JsonPropertyName("picture")]
    public string Picture { get; set; } = "";
}
