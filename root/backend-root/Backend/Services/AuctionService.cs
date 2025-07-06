using Backend.Classes;
using Backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public partial interface IAuctionService
    {
        Task<ActionResult<IEnumerable<AuctionArticle>>> GetAuctions();
        Task<ActionResult<AuctionArticle>> GetAuction(int id);
        Task<ActionResult<IEnumerable<AuctionArticle>>> GetRandomArticles(int count);
        Task<ActionResult<AuctionArticle>> PostAuction(AuctionArticle auctionArticle);
        Task<IActionResult> PutAuction(int id, AuctionArticle auctionArticle);
        Task<ActionResult> DeleteAuction(int id);
    }
    public partial class AuctionService : ControllerBase, IAuctionService
    {
        private readonly WebShop24DbContext _context;

        public AuctionService(WebShop24DbContext context)
        {
            _context = context;
        }

        // Get
        public async Task<ActionResult<IEnumerable<AuctionArticle>>> GetAuctions()
        {
            return await _context.Auctions.ToListAsync();
        }

        // Get/{id}
        public async Task<ActionResult<AuctionArticle>> GetAuction(int id)
        {
            AuctionArticle auctionArticle = await _context.Auctions.FindAsync(id);

            if (auctionArticle == null || auctionArticle.IsEnded == true)
            {
                return NotFound();
            }
            return auctionArticle;
        }

        // Get random auctions
        public async Task<ActionResult<IEnumerable<AuctionArticle>>> GetRandomArticles(int count)
        {
            List<AuctionArticle> auctionArticles = [];
            return await _context.Auctions.Where(a => a.IsEnded == false).OrderBy(article => EF.Functions.Random()).Take(count).ToListAsync();
        }

        // Post
        public async Task<ActionResult<AuctionArticle>> PostAuction(AuctionArticle auctionArticle)
        {
            auctionArticle.Owner = null;
            _context.Auctions.Add(auctionArticle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuction", new { id = auctionArticle.ArticleId }, auctionArticle);
        }

        // Put
        public async Task<IActionResult> PutAuction(int id, AuctionArticle auctionArticle)
        {
            if (id != auctionArticle.ArticleId || auctionArticle.IsEnded == true)
            {
                return BadRequest();
            }
            _context.Entry(auctionArticle).State = EntityState.Modified;
            try
            {
                _context.Auctions.Update(auctionArticle);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuctionExists(id))
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
        // Delete
        public async Task<ActionResult> DeleteAuction(int id)
        {
            AuctionArticle auctionArticle = await _context.Auctions.FindAsync(id);
            if (auctionArticle == null)
            {
                return NotFound();
            }
            if (auctionArticle.IsEnded == true)
            {
                return BadRequest();
            }
            _context.Auctions.Remove(auctionArticle);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        public List<AuctionArticle> GetWonAuctions(int userId)
        {
            return _context.Auctions.Where(a => a.WinnerId == userId).ToList();
        }

        private bool AuctionExists(int id)
        {
            return _context.Auctions.Any(a => a.ArticleId == id);
        }
    }
}
