using AutoMapper;
using Core.Interfaces;
using Core.Models.Auth;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebApiATB.Controllers;


[Route("api/[controller]")]
[ApiController]
public class AuthController(UserManager<UserEntity> userManager, IMapper mapper, IImageService imageService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthLoginModel model)
    {
        if (model == null || string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
            return BadRequest("Email and password are required.");

        var user = await userManager.FindByEmailAsync(model.Email);
        if (user == null)
            return Unauthorized("Invalid credentials.");

        var valid = await userManager.CheckPasswordAsync(user, model.Password);
        if (!valid)
            return Unauthorized("Invalid credentials.");

        return Ok();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromForm] AuthRegistrationModel model)
    {
        if (model == null)
        {
            return BadRequest(); // 400
        }
        string imageStr = null;
        if (model.Image != null)
        {
            imageStr = await imageService.SaveImageAsync(model.Image);
        }
        var user = mapper.Map<UserEntity>(model);
        user.Image = imageStr;
        var result = await userManager.CreateAsync(user, model.Password);


        const string roleName = "User";

        if (result.Succeeded)
        {
            var addToRoleResult = await userManager.AddToRoleAsync(user, roleName);
            
        }
        else
        {
            return BadRequest(string.Join("\n", result.Errors.Select(x => x.Description)));
        }

        return Ok();
    }
}
