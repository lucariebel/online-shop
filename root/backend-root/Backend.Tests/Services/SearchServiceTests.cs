using Backend.Classes;
using Backend.Context;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
namespace Backend.Tests.Services
{
    [TestFixture]
    public class SearchServiceTests
    {
        private WebShop24DbContext _dbContext;

        [SetUp]
        public void SetUp()
        {
            var options = new DbContextOptionsBuilder<WebShop24DbContext>()
               .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _dbContext = new WebShop24DbContext(options);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Dispose();
        }

        [Test]
        public async Task SearchDirectBuyArticle()
        {
            // Arrange
            var searchService = new SearchService(_dbContext);
            User user = new()
            {
                UserId = 1,
                Username = "TestUser",
                Password = "123",
                Cash = 1000
            };
            var directBuyArticle = new DirectBuyArticle { ArticleName = "Example", ArticleId = 0, Description = "Example Description", OwnerId = 1, IsAvailable = true, Pictures = [""], Price = 100};
         
            // Act
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            await _dbContext.Articles.AddAsync(directBuyArticle);
            await _dbContext.SaveChangesAsync();
            var a = _dbContext.Articles.ToList();
         
            var result = searchService.SearchDirectBuyArticle("Example");

            // Assert
            Assert.IsNotNull(result);
            Assert.Contains("Example", result.Select(a => a.ArticleName).ToArray());
        }

        [Test]
        public async Task SearchAuctionArticle()
        {
            var searchService = new SearchService(_dbContext);
            User user = new()
            {
                UserId = 1,
                Username = "TestUser",
                Password = "123",
                Cash = 1000
            };
            var auctionArticle = new AuctionArticle { ArticleName = "Example", ArticleId = 0, Description = "Example Description", OwnerId = 1, IsEnded = false, Pictures = [""], Bid = 100 };

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            await _dbContext.Auctions.AddAsync(auctionArticle);
            await _dbContext.SaveChangesAsync();

            var result = searchService.SearchAuctionArticle("Example");

            Assert.IsNotNull(result);
            Assert.Contains("Example", result.Select(a => a.ArticleName).ToArray());
        }

    }
}
