using Backend.Classes;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        
        [HttpPost("register")]
        public async Task<IResult> Register(User user)
        {
            user.Password = _authService.HashPassword(user.Password);
            return await _authService.RegisterUser(user);
        }

        [HttpPost("login")]
        public async Task<IResult> Login(User user)
        {
            user.Password = _authService.HashPassword(user.Password);
            return await _authService.Login(user);
        }
    }
};
