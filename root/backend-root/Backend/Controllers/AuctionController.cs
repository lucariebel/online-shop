using Backend.Classes;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionService _auctionService;

        public AuctionController(IAuctionService auctionService)
        {
            _auctionService = auctionService;
        }

        // Get: api/Auction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuctionArticle>>> GetAuctions()
        {
            return await _auctionService.GetAuctions();
        }

        // Get: api/Auction/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionArticle>> GetAuction(int id)
        {
            return await _auctionService.GetAuction(id);
        }

        // Get: api/Auction/Random
        [HttpGet("Random")]
        public async Task<ActionResult<IEnumerable<AuctionArticle>>> GetRandomAuctions(int count)
        {
            return await _auctionService.GetRandomArticles(count);
        }

        // Post: api/Auction
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<AuctionArticle>> PostAuction(AuctionArticle auctionArticle)
        {
            return await _auctionService.PostAuction(auctionArticle);
        }

        // Put: api/Auction
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(int id, AuctionArticle auctionArticle)
        {
            return await _auctionService.PutAuction(id, auctionArticle);
        }

        // Delete: api/Auction
        [Authorize]
        [HttpDelete]
        public async Task<ActionResult> DeleteAuction(int id)
        {
            return await _auctionService.DeleteAuction(id);
        }
    }
}
