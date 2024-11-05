using Backend.Classes;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }
        

        // Get: api/Article
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DirectBuyArticle>>> GetArticles()
        {
            return await _articleService.GetArticles();
        }

        // Get: api/Article/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DirectBuyArticle>> GetArticle(int id)
        {
            return await _articleService.GetArticle(id);
        }

        // Post: api/Article
        [HttpPost]
        public async Task<ActionResult<DirectBuyArticle>> PostArticle(DirectBuyArticle directBuyArticle)
        {
            return await _articleService.PostArticle(directBuyArticle);
        }
    }
}
