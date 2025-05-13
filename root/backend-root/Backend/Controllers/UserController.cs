using Backend.Classes;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]

public class UserController : ControllerBase
{
    
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    // Put: api/Article
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutArticle(int id, User user)
    {
        return await _userService.PutUser(id, user);
    }
}