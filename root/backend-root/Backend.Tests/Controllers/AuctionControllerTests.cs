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
    public class AuctionControllerTests
    {
        private Mock<IAuctionService> _mockService;
        private AuctionController _controller;

        [SetUp]
        public void SetUp()
        {
            _mockService = new Mock<IAuctionService>();
            _controller = new AuctionController(_mockService.Object);
        }

        [Test]
        public async Task GetAuctions_ShouldReturnAllAuctions()
        {
            // Arrange
            var auctions = new List<AuctionArticle>
            {
                new() { ArticleId = 1, ArticleName = "Auktion 1" },
                new() { ArticleId = 2, ArticleName = "Auktion 2" }
            };
            _mockService.Setup(s => s.GetAuctions()).ReturnsAsync(auctions);

            // Act
            var result = await _controller.GetAuctions();

            // Assert
            Assert.That(result.Value, Is.EqualTo(auctions));
        }

        [Test]
        public async Task GetAuction_ShouldReturnAuctionById()
        {
            // Arrange
            var auction = new AuctionArticle { ArticleId = 5, ArticleName = "Einzelauktion" };
            _mockService.Setup(s => s.GetAuction(5)).ReturnsAsync(auction);

            // Act
            var result = await _controller.GetAuction(5);

            // Assert
            Assert.That(result.Value, Is.Not.Null);
            Assert.That(result.Value.ArticleId, Is.EqualTo(5));
        }

        [Test]
        public async Task GetRandomAuctions_ShouldReturnCount()
        {
            // Arrange
            var auctions = new List<AuctionArticle>
            {
                new() { ArticleId = 10 },
                new() { ArticleId = 11 }
            };
            _mockService.Setup(s => s.GetRandomArticles(2)).ReturnsAsync(auctions);

            // Act
            var result = await _controller.GetRandomAuctions(2);

            // Assert
            Assert.That(result.Value.Count, Is.EqualTo(2));
        }

        [Test]
        public async Task PostAuction_ShouldReturnCreatedAuction()
        {
            // Arrange
            var newAuction = new AuctionArticle { ArticleId = 7, ArticleName = "Neue Auktion" };
            _mockService.Setup(s => s.PostAuction(newAuction)).ReturnsAsync(newAuction);

            // Act
            var result = await _controller.PostAuction(newAuction);

            // Assert
            Assert.That(result.Value, Is.EqualTo(newAuction));
        }

        [Test]
        public async Task PutArticle_ShouldReturnNoContent()
        {
            // Arrange
            var auction = new AuctionArticle { ArticleId = 3 };
            _mockService.Setup(s => s.PutAuction(3, auction)).ReturnsAsync(new NoContentResult());

            // Act
            var result = await _controller.PutArticle(3, auction);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }

        [Test]
        public async Task DeleteAuction_ShouldReturnNoContent()
        {
            // Arrange
            _mockService.Setup(s => s.DeleteAuction(9)).ReturnsAsync(new NoContentResult());

            // Act
            var result = await _controller.DeleteAuction(9);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);
        }
    }
}
