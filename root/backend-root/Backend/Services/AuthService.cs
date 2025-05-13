using System.Security.Claims;
using System.Text;
using Backend.Classes;
using Backend.Context;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services;

public partial interface IAuthService
{
    Task<IResult> RegisterUser(User user);
    Task<IResult> Login(User user);
    string HashPassword(string password);
}

public partial class AuthService : ControllerBase, IAuthService
{
    private readonly WebShop24DbContext _context;
    
    private readonly byte[] _tokenKey = Encoding.ASCII.GetBytes("EinSehrLangerGeheimerSchluessel123!!!!!");

    private readonly byte[] _hashKey = Encoding.ASCII.GetBytes("EinSehrLangerGeheimerSchluessel123FürPasswort!!!!!");
    
    public AuthService(WebShop24DbContext context)
    {
        _context = context;
    }
    
    // Login
    public async Task<IResult> Login(User user)
    {
        User User = await GetUserByUsername(user.Username);
        if (user.Username == User.Username && user.Password == User.Password)
        {
            var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.UserId = User.UserId;
            user.Cash = User.Cash;
            return Results.Ok(new { token = tokenHandler.WriteToken(token), user });// Das Token zurückgeben

        }
        return Results.Unauthorized();
    }

    public async Task<User> GetUserByUsername(string username)
    {
        User user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        return user;
    }
    
    // Get
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }
    
    // Get/{id}
    public async Task<ActionResult<User>> GetUser(int id)
    {
        User user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }
        return user;
    }
    
    public async Task<IResult> RegisterUser(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return await Login(user);
    }

    public string HashPassword(string password)
    {
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password!,
            salt: _hashKey,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));
        return hashed;
    }
}