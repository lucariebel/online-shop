using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Backend.Classes;
using Backend.Context;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;

namespace Backend.Tests
{
    [TestFixture]
    public class AuctionMonitorServiceTests
    {
        private WebShop24DbContext _dbContext;
        private IServiceProvider _serviceProvider;

        [SetUp]
        public void SetUp()
        {
            var options = new DbContextOptionsBuilder<WebShop24DbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _dbContext = new WebShop24DbContext(options);

            // Manueller ServiceProvider mit fixiertem DbContext
            var services = new ServiceCollection();
            services.AddSingleton(_dbContext);
            var builtProvider = services.BuildServiceProvider();

            var scopeMock = new Mock<IServiceScope>();
            scopeMock.Setup(s => s.ServiceProvider).Returns(builtProvider);

            var scopeFactoryMock = new Mock<IServiceScopeFactory>();
            scopeFactoryMock.Setup(f => f.CreateScope()).Returns(scopeMock.Object);

            var providerMock = new Mock<IServiceProvider>();
            providerMock.Setup(p => p.GetService(typeof(IServiceScopeFactory)))
                        .Returns(scopeFactoryMock.Object);

            _serviceProvider = providerMock.Object;
        }

        private async Task InvokeCheckAuctionsAsync(AuctionMonitorService service)
        {
            var method = typeof(AuctionMonitorService)
                .GetMethod("CheckAuctionsAsync", BindingFlags.NonPublic | BindingFlags.Instance);

            await (Task)method.Invoke(service, null);
        }

        [Test]
        public async Task CheckAuctionsAsync_ShouldMarkAuctionAsEnded_AndDeductCash()
        {
            // Arrange
            var user = new User
            {
                UserId = 1,
                Cash = 100,
                Username = "tester",
                Password = "pw"
            };

            var auction = new AuctionArticle
            {
                ArticleId = 1,
                ArticleName = "Alte Uhr",
                OwnerId = 2,
                Pictures = new List<string>(),
                Description = "Beschreibung",
                WinnerId = 1,
                EndDate = DateTime.UtcNow.AddMinutes(-10),
                Bid = 25,
                IsEnded = false
            };

            _dbContext.Users.Add(user);
            _dbContext.Set<AuctionArticle>().Add(auction);
            await _dbContext.SaveChangesAsync();

            var service = new AuctionMonitorService(_serviceProvider);

            // Act
            await InvokeCheckAuctionsAsync(service);

            // Assert
            var updatedAuction = _dbContext.Set<AuctionArticle>().First();
            var updatedUser = _dbContext.Users.First();

            Assert.IsTrue(updatedAuction.IsEnded);
            Assert.AreEqual(75, updatedUser.Cash);
        }
    }
}