using Backend.Classes;
using Backend.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public interface IArticleService
    {
        Task<ActionResult<IEnumerable<DirectBuyArticle>>> GetArticles();
        Task<ActionResult<DirectBuyArticle>> GetArticle(int id);
        Task<ActionResult<IEnumerable<DirectBuyArticle>>> GetRandomArticles(int count);
        Task<ActionResult<DirectBuyArticle>> PostArticle(DirectBuyArticle directBuyArticle);
        Task<IActionResult> PutArticle(int id, DirectBuyArticle directBuyArticle);
        Task<ActionResult> DeleteArticle(int id);
    }
    public class ArticleService : ControllerBase, IArticleService
    {
        private readonly WebShop24DbContext _context;

        public ArticleService(WebShop24DbContext context)
        {
            _context = context;
        }

        // Get
        public async Task<ActionResult<IEnumerable<DirectBuyArticle>>> GetArticles()
        {
            return await _context.Articles
                         .Where(article => article.IsAvailable)
                         .ToListAsync();
        }

        // Get/{id}
        public async Task<ActionResult<DirectBuyArticle>> GetArticle(int id)
        {
            DirectBuyArticle directBuyArticle = await _context.Articles.FindAsync(id);

            if (directBuyArticle == null)
            {
                return NotFound();
            }
            return directBuyArticle;
        }

        // Get random articles
        public async Task<ActionResult<IEnumerable<DirectBuyArticle>>> GetRandomArticles(int count)
        {
            List<DirectBuyArticle> directBuyArticles = [];
            return await _context.Articles.OrderBy(article => EF.Functions.Random()).Take(count).ToListAsync(); ;
        }

        // Post
        public async Task<ActionResult<DirectBuyArticle>> PostArticle(DirectBuyArticle directBuyArticle)
        {
            _context.Articles.Add(directBuyArticle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticle", new { id = directBuyArticle.ArticleId }, directBuyArticle);
        }

        // Put
        public async Task<IActionResult> PutArticle(int id, DirectBuyArticle directBuyArticle)
        {
            if (id != directBuyArticle.ArticleId || directBuyArticle.IsAvailable == false)
            {
                return BadRequest();
            }
            _context.Entry(directBuyArticle).State = EntityState.Modified;
            try
            {
                _context.Articles.Update(directBuyArticle);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
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
        public async Task<ActionResult> DeleteArticle(int id)
        {
            DirectBuyArticle directBuyArticle = await _context.Articles.FindAsync(id);
            if (directBuyArticle == null)
            {
                return NotFound();
            }
            _context.Articles.Remove(directBuyArticle);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ArticleExists(int id)
        {
            return _context.Articles.Any(a => a.ArticleId == id);
        }
    }
}
