using System.Text.Json.Serialization;

namespace Core.Models.Seeder
{
    public class SeederCategoryModel
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = "";

        [JsonPropertyName("image")]
        public string Image { get; set; } = "";
    }
}
