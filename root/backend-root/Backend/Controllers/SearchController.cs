using Backend.Classes;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;
        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        [HttpGet("Article")]
        public ActionResult<List<DirectBuyArticle>> GetDirectBuyArticleSearch([FromQuery] string search)
        {
            try
            {
                return Ok(_searchService.GetDirectBuyArticleSearch(search));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
                throw;
            }
        }
    }
}
