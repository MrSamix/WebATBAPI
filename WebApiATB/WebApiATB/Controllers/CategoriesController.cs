using Core.Models.Category;
using Domain;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebApiATB.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(AppDbContext appDbContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var items = appDbContext
            .Categories
            .Select(x=>
                new CategoryItemModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Image = x.Image ?? ""
                });

        return Ok(items); //Статус код 200
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] CategoryCreateModel model)
    {
        var entity = new CategoryEntity()
        {
            Name = model.Name,
            Image = model.Image,
        };
        
        appDbContext.Categories.Add(entity);
        await appDbContext.SaveChangesAsync();

        return Ok(); //Статус код 200
    }
}
