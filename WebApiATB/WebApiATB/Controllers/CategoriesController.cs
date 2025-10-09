using Core.Models.Category;
using Domain;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebApiATB.Interfaces;

namespace WebApiATB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController(AppDbContext appDbContext, IImageService imageService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var items = appDbContext.Categories.Select(x => new CategoryItemModel
            {
                Id = x.Id,
                Name = x.Name,
                Image = x.Image ?? ""
            });
            return Ok(items); // Status code 200
        }

        [HttpPost]
        public async Task<IActionResult> Create(CategoryItemModel item)
        {
            if (item != null)
            {
                string image = item.Image != null ? await imageService.SaveImageAsync(item.Image) : null!;
                var model = new CategoryEntity
                {
                    Name = item.Name,
                    Image = image
                };
                appDbContext.Categories.Add(model);
                await appDbContext.SaveChangesAsync();
                return Ok(); // Status code 200
            }
            return BadRequest(); // Status code 400
        }
    }
}
