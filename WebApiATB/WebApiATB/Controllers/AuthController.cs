using Microsoft.AspNetCore.Mvc;

namespace WebApiATB.Controllers;


[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    public async Task<IActionResult> Index()
    {
        return Ok();
    }
}
