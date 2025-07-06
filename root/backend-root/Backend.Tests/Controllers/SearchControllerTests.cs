using Backend.Classes;
using Backend.Controllers;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace Backend.Tests.Controllers
{
    [TestFixture]
    public class SearchControllerTests
    {
        private Mock<ISearchService> _mockSearchService;
        private SearchController _controller;

        [SetUp]
        public void SetUp()
        {
            _mockSearchService = new Mock<ISearchService>();
            _controller = new SearchController(_mockSearchService.Object);
        }

        [Test]
        public void SearchDirectBuyArticle_ShouldReturnArticles_WhenFound()
        {
            // Arrange
            var searchTerm = "Laptop";
            var resultList = new List<DirectBuyArticle>
            {
                new() { ArticleId = 1, ArticleName = "Gaming Laptop" }
            };

            _mockSearchService.Setup(s => s.SearchDirectBuyArticle(searchTerm)).Returns(resultList);

            // Act
            var result = _controller.SearchDirectBuyArticle(searchTerm);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.That(okResult.Value, Is.EqualTo(resultList));
        }

        [Test]
        public void SearchDirectBuyArticle_ShouldReturnBadRequest_OnException()
        {
            // Arrange
            var searchTerm = "Laptop";
            _mockSearchService.Setup(s => s.SearchDirectBuyArticle(searchTerm)).Throws(new Exception("Fehler"));

            // Act
            var result = _controller.SearchDirectBuyArticle(searchTerm);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
        }

        [Test]
        public void SearchAuctionArticle_ShouldReturnArticles_WhenFound()
        {
            // Arrange
            var searchTerm = "Buch";
            var resultList = new List<DirectBuyArticle>
            {
                new() { ArticleId = 2, ArticleName = "Harry Potter Auktion" }
            };

            _mockSearchService.Setup(s => s.SearchDirectBuyArticle(searchTerm)).Returns(resultList);

            // Act
            var result = _controller.SearchDirectBuyArticle(searchTerm);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.That(okResult.Value, Is.EqualTo(resultList));
        }

        [Test]
        public void SearchAuctionArticle_ShouldReturnBadRequest_OnException()
        {
            // Arrange
            var searchTerm = "Buch";
            _mockSearchService.Setup(s => s.SearchAuctionArticle(searchTerm)).Throws(new Exception("Fehler"));

            // Act
            var result = _controller.SearchAuctionArticle(searchTerm);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
        }
    }
}
