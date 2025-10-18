using Core.Models.Category;
using Domain;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using WebApiATB.Interfaces;

namespace WebApiATB.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(AppDbContext appDbContext, IImageService imageService) : ControllerBase
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
            Image = model.Image is not null ? await imageService.SaveImageAsync(model.Image) : null,
        };

        appDbContext.Categories.Add(entity);
        await appDbContext.SaveChangesAsync();

        return Ok(); //Статус код 200
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromForm] CategoryUpdateModel model)
    {
        var entity = appDbContext.Categories.FirstOrDefault(x => x.Id == model.Id);
        if (entity == null)
            return NotFound();

        // delete old photo
        if (entity.Image != null)
        {
            await imageService.DeleteImageAsync(entity.Image);
        }
        
        entity.Name = model.Name;
        entity.Image = model.Image is not null ? await imageService.SaveImageAsync(model.Image) : null;
        await appDbContext.SaveChangesAsync();
        return Ok();
    }



    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = appDbContext.Categories.FirstOrDefault(x => x.Id == id);
        if (entity == null)
            return NotFound();
        appDbContext.Categories.Remove(entity);

        // remove photo function
        if (entity.Image != null)
        {
            await imageService.DeleteImageAsync(entity.Image);     
        }
        await appDbContext.SaveChangesAsync();
        return Ok();
    }
}
