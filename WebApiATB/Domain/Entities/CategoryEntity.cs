using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class CategoryEntity : BaseEntity<int>
    {
        [Required, StringLength(255)]
        public string Name { get; set; } = string.Empty;
        [StringLength(200)]
        public string? Image { get; set; }
    }
}
