using Backend.Classes;
using Backend.Controllers;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Tests.Controllers
{
    [TestFixture]
    public class ArticleControllerTests
    {
        private Mock<IArticleService> _mockService;
        private ArticleController _controller;

        [SetUp]
        public void SetUp()
        {
            _mockService = new Mock<IArticleService>();
            _controller = new ArticleController(_mockService.Object);
        }

        [Test]
        public async Task GetArticles_ShouldReturnAllArticles()
        {
            // Arrange
            var articles = new List<DirectBuyArticle>
            {
                new() { ArticleId = 1, ArticleName = "Artikel A" },
                new() { ArticleId = 2, ArticleName = "Artikel B" }
            };
            _mockService.Setup(s => s.GetArticles()).ReturnsAsync(articles);

            // Act
            var result = await _controller.GetArticles();

            // Assert
            Assert.That(result.Value, Is.EqualTo(articles));
        }

        [Test]
        public async Task GetArticle_ShouldReturnCorrectArticle()
        {
            // Arrange
            var article = new DirectBuyArticle { ArticleId = 5, ArticleName = "Testartikel" };
            _mockService.Setup(s => s.GetArticle(5)).ReturnsAsync(article);

            // Act
            var result = await _controller.GetArticle(5);

            // Assert
            Assert.That(result.Value, Is.Not.Null);
            Assert.That(result.Value.ArticleId, Is.EqualTo(5));
        }

        [Test]
        public async Task GetRandomArticles_ShouldReturnGivenNumber()
        {
            // Arrange
            var articles = new List<DirectBuyArticle>
            {
                new() { ArticleId = 1 }, new() { ArticleId = 2 }
            };
            _mockService.Setup(s => s.GetRandomArticles(2)).ReturnsAsync(articles);

            // Act
            var result = await _controller.GetRandomArticles(2);

            // Assert
            Assert.That(result.Value.Count, Is.EqualTo(2));
        }

        [Test]
        public async Task PostArticle_ShouldReturnCreatedArticle()
        {
            // Arrange
            var newArticle = new DirectBuyArticle { ArticleId = 10, ArticleName = "Neu" };
            _mockService.Setup(s => s.PostArticle(newArticle)).ReturnsAsync(newArticle);

            // Act
            var result = await _controller.PostArticle(newArticle);

            // Assert
            Assert.That(result.Value.ArticleId, Is.EqualTo(10));
            Assert.That(result.Value.ArticleName, Is.EqualTo("Neu"));
        }

        [Test]
        public async Task PutArticle_ShouldReturnNoContent()
        {
            // Arrange
            var article = new DirectBuyArticle { ArticleId = 7 };
            _mockService.Setup(s => s.PutArticle(7, article)).ReturnsAsync(new NoContentResult());

            // Act
            var result = await _controller.PutArticle(7, article);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public async Task DeleteArticle_ShouldReturnNoContent()
        {
            // Arrange
            _mockService.Setup(s => s.DeleteArticle(3)).ReturnsAsync(new NoContentResult());

            // Act
            var result = await _controller.DeleteArticle(3);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }
    }
}
