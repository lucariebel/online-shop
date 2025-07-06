using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Classes;
using Backend.Context;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

namespace Backend.Tests.Services
{
    public class AuctionServiceTests
    {
        private WebShop24DbContext _context;
        private AuctionService _service;

        private readonly AuctionArticle _expectedAuction1 = new AuctionArticle { ArticleId = 1, ArticleName = "Auction 1", EndDate = DateTime.Now.AddDays(7), Bid = 10, Description = "This is a test auction.", IsEnded = false, OwnerId = 1, Pictures = new List<string> { "image1.jpg", "image2.jpg" } };
        private readonly AuctionArticle _expectedAuction2 = new AuctionArticle { ArticleId = 2, ArticleName = "Auction 2", EndDate = DateTime.Now.AddDays(7), Bid = 10, Description = "This is a test auction.", IsEnded = false, OwnerId = 1, Pictures = new List<string> { "image1.jpg", "image2.jpg" } };
        private readonly AuctionArticle _expectedAuction3 = new AuctionArticle { ArticleId = 3, ArticleName = "Auction 3", EndDate = DateTime.Now.AddDays(7), Bid = 10, Description = "This is a test auction.", IsEnded = false, OwnerId = 1, Pictures = new List<string> { "image1.jpg", "image2.jpg" } };

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<WebShop24DbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new WebShop24DbContext(options);
            _context.Database.EnsureDeleted();
            _context.Database.EnsureCreated();

            _service = new AuctionService(_context);

            var auction1 = new AuctionArticle { ArticleId = 0, ArticleName = "Auction 1", EndDate = DateTime.Now.AddDays(7), Bid = 10, Description = "This is a test auction.", IsEnded = false, OwnerId = 1, Pictures = new List<string> { "image1.jpg", "image2.jpg" } };
            var auction2 = new AuctionArticle { ArticleId = 0, ArticleName = "Auction 2", EndDate = DateTime.Now.AddDays(7), Bid = 10, Description = "This is a test auction.", IsEnded = false, OwnerId = 1, Pictures = new List<string> { "image1.jpg", "image2.jpg" } };
            var auction3 = new AuctionArticle { ArticleId = 0, ArticleName = "Auction 3", EndDate = DateTime.Now.AddDays(7), Bid = 10, Description = "This is a test auction.", IsEnded = false, OwnerId = 1, Pictures = new List<string> { "image1.jpg", "image2.jpg" } };

            var user = new User { UserId = 1, Username = "testuser", Password = "testpassword", Cash = 100 };

            _context.Users.Add(user);
            _context.Auctions.AddRange(auction1, auction2, auction3);
            _context.SaveChanges();
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }

        [Test]
        public async Task GetAuctions_ReturnsAllAuctions()
        {
            var result = _service.GetAuctions().Result.Value.ToList();

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Count);
            Assert.AreEqual(_expectedAuction1.ArticleId, 1);
            Assert.AreEqual(_expectedAuction2.ArticleId, 2);
        }

        [Test]
        public async Task GetArticle_ById()
        {
            var result = await _service.GetAuction(1);

            Assert.IsNotNull(result);
            Assert.That(1, Is.EqualTo(_expectedAuction1.ArticleId));
            Assert.That("Auction 1", Is.EqualTo(_expectedAuction1.ArticleName));
            Assert.That(10, Is.EqualTo(_expectedAuction1.Bid));
        }

        [Test]
        public async Task GetRandomArticles_ReturnsRandomAuctions()
        {
            var result = _service.GetRandomArticles(2).Result.Value.ToList();

            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
        }

        [Test]
        public async Task PostAuction_AcceptsValidAuctionArticle()
        {
            var auctionArticle = new AuctionArticle() { ArticleId = 0, ArticleName = "New Auction", Bid = 15, Description = "This is a new auction.", EndDate = DateTime.Now.AddDays(7), IsEnded = false, Pictures = new List<string>(), OwnerId = 1, };

            var result = await _service.PostAuction(auctionArticle);

            var auction = await _context.Auctions.FindAsync(4);

            Assert.IsNotNull(auction);
            Assert.AreEqual("New Auction", auction.ArticleName);
        }
    }
}
