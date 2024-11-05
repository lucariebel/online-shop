using Backend.Classes;
using Backend.Context;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public partial interface IArticleService
    {
        Task<ActionResult<IEnumerable<DirectBuyArticle>>> GetArticles();
        Task<ActionResult<DirectBuyArticle>> GetArticle(int id);
        Task<ActionResult<DirectBuyArticle>> PostArticle(DirectBuyArticle directBuyArticle);
    }
    public partial class ArticleService : ControllerBase, IArticleService
    {
        private readonly WebShop24DbContext _context;

        public ArticleService(WebShop24DbContext context)
        {
            _context = context;
        }

        // Get
        public async Task<ActionResult<IEnumerable<DirectBuyArticle>>> GetArticles()
        {
            return await _context.Articles.ToListAsync();
        }

        public async Task<ActionResult<DirectBuyArticle>> GetArticle(int id)
        {
            DirectBuyArticle directBuyArticle = await _context.Articles.FindAsync(id);

            if(directBuyArticle == null)
            {
                return NotFound();
            }
            return directBuyArticle;
        }

        // Post
        public async Task<ActionResult<DirectBuyArticle>> PostArticle(DirectBuyArticle directBuyArticle)
        {
            _context.Articles.Add(directBuyArticle);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArticle", new { id = directBuyArticle.ArticleId }, directBuyArticle);
        }
    }
}
