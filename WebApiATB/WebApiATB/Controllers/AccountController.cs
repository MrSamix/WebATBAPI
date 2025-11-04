using AutoMapper;
using Core.Constants;
using Core.Interfaces;
using Core.Models.Account;
using Core.Services;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebApiATB.Controllers;


[Route("api/[controller]/[action]")] // api/account/login
[ApiController]
public class AccountController(UserManager<UserEntity> userManager, IMapper mapper, IImageService imageService, IJwtTokenService jwtTokenService, IAccountService accountService) : ControllerBase
{
    //[HttpPost("login")]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] AccountLoginModel model)
    {
        //if (model == null || string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
        //    return BadRequest("Email and password are required.");

        //var user = await userManager.FindByEmailAsync(model.Email);
        //if (user == null)
        //    return Unauthorized("Invalid credentials.");

        //var valid = await userManager.CheckPasswordAsync(user, model.Password);
        //if (!valid)
        //    return Unauthorized("Invalid credentials.");

        //return Ok();

        var user = await userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return BadRequest();
        }
        var token = await jwtTokenService.CreateTokenAsync(user);
        return Ok(new
        {
            token
        });
    }

    //[HttpPost("register")]
    [HttpPost]
    public async Task<IActionResult> Register([FromForm] AccountRegistrationModel model)
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

        if (result.Succeeded)
        {
            var addToRoleResult = await userManager.AddToRoleAsync(user, Roles.User);
            if (addToRoleResult.Succeeded)
            {
                return Ok();
            }
        }
        return BadRequest();
        //}
        //else
        //{
        //    return BadRequest(string.Join("\n", result.Errors.Select(x => x.Description)));
        //}

        //return Ok();
    }


    [HttpPost]
    public async Task<IActionResult> GoogleLogin([FromBody] AccountGoogleRequestModel model)
    {
        string result = await accountService.LoginByGoogle(model.Token);
        if (string.IsNullOrEmpty(result))
        {
            return BadRequest(new
            {
                Status = 400,
                IsValid = false,
                Errors = new { Email = "Помилка під час авторизації" }
            });
        }
        return Ok(new
        {
            Token = result
        });
    }
}
