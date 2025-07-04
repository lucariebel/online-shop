using Backend.Classes;
using Backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public partial interface IUserService
    {
        Task<IActionResult> PutUser(int id, User user);
    }

    public partial class UserService : ControllerBase, IUserService
    {
        private readonly WebShop24DbContext _context;

        public UserService(WebShop24DbContext context)
        {
            _context = context;
        }

        // Put
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(a => a.UserId == id);
        }
    }

}
