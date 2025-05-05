using Backend.Classes;
using Backend.Context;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Tests
{
    [TestFixture]
    public class ArticleServiceTests
    {
        private WebShop24DbContext _context;
        private ArticleService _service;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<WebShop24DbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            _context = new WebShop24DbContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _context.Users.Add(
                new User { UserId = 1, Username = "TestUser", Password = "TestPassword" }
                );

            _context.Articles.AddRange(
                new DirectBuyArticle { ArticleId = 1, ArticleName = "Artikel 1", IsAvailable = true, Description = "test", Pictures = ["abc"], Price = 100, UserId = 1 },
                new DirectBuyArticle { ArticleId = 2, ArticleName = "Artikel 2", IsAvailable = false, Description = "test", Pictures = ["abc"], Price = 100, UserId = 1 },
                new DirectBuyArticle { ArticleId = 3, ArticleName = "Artikel 3", IsAvailable = true, Description = "test", Pictures = ["abc"], Price = 100, UserId = 1 }
            );
            _context.SaveChanges();

            _service = new ArticleService(_context);
        }

        [Test]
        public async Task GetArticles_ReturnsOnlyAvailable()
        {
            var result = await _service.GetArticles();

            var okResult = result.Value.ToList();

            Assert.AreEqual(2, okResult.Count);
            Assert.IsTrue(okResult.All(a => a.IsAvailable));
        }

        [Test]
        public async Task GetArticle_ExistingId_ReturnsArticle()
        {
            var result = await _service.GetArticle(1);
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(1, result.Value.ArticleId);
        }

        [Test]
        public async Task GetArticle_NonExistingId_ReturnsNotFound()
        {
            var result = await _service.GetArticle(999);
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        [Test]
        public async Task PostArticle_AddsNewArticle()
        {
            var newArticle = new DirectBuyArticle { ArticleId = 10, ArticleName = "Neuer Artikel", IsAvailable = true, Description = "test", Pictures = ["abc"], Price = 100, UserId = 1 };
            var result = await _service.PostArticle(newArticle);

            var createdResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdResult);
            Assert.AreEqual(10, ((DirectBuyArticle)createdResult.Value).ArticleId);
        }

        [Test]
        public async Task DeleteArticle_RemovesArticle()
        {
            var result = await _service.DeleteArticle(1);
            Assert.IsInstanceOf<NoContentResult>(result);

            var deleted = await _context.Articles.FindAsync(1);
            Assert.IsNull(deleted);
        }

        [Test]
        public async Task PutArticle_ValidUpdate_ReturnsNoContent()
        {
            var article = await _context.Articles.FindAsync(1);
            article.ArticleName = "Geändert";

            var result = await _service.PutArticle(1, article);

            Assert.IsInstanceOf<NoContentResult>(result);

            var updated = await _context.Articles.FindAsync(1);
            Assert.AreEqual("Geändert", updated.ArticleName);
        }

        [Test]
        public async Task PutArticle_IdMismatch_ReturnsBadRequest()
        {
            var article = new DirectBuyArticle { ArticleId = 2, ArticleName = "Mismatch" };

            var result = await _service.PutArticle(999, article);

            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [Test]
        public async Task DeleteArticle_NotFound_ReturnsNotFound()
        {
            var result = await _service.DeleteArticle(999);
            Assert.IsInstanceOf<NotFoundResult>(result);
        }
    }
}
