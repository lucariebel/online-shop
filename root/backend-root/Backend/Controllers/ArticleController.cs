using Backend.Classes;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
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

        // Get: api/Article/Random
        [HttpGet("Random")]
        public async Task<ActionResult<IEnumerable<DirectBuyArticle>>> GetRandomArticles(int count)
        {
            return await _articleService.GetRandomArticles(count);
        }

        // Post: api/Article
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<DirectBuyArticle>> PostArticle(DirectBuyArticle directBuyArticle)
        {
            return await _articleService.PostArticle(directBuyArticle);
        }

        // Put: api/Article
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(int id, DirectBuyArticle directBuyArticle)
        {
            return await _articleService.PutArticle(id, directBuyArticle);
        }

        // Delete: api/Article
        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            return await _articleService.DeleteArticle(id);
        }
    }
}
