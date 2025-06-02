using Backend.Classes;
using Backend.Context;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System.Reflection;

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

            _dbContext.Users.AddRange(new User
            {
                UserId = 1,
                Cash = 100,
                Username = "tester",
                Password = "pw",
                ParticipatedAuctionIds = new List<int> { 1 }
            },
            new User
            {
                UserId = 2,
                Cash = 100,
                Username = "tester2",
                Password = "pw",
                ParticipatedAuctionIds = new List<int> { 2 }
            });

            _dbContext.Set<AuctionArticle>().AddRange(new AuctionArticle
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
            }, new AuctionArticle
            {
                ArticleId = 2,
                ArticleName = "Alte Uhr",
                OwnerId = 1,
                Pictures = new List<string>(),
                Description = "Beschreibung",
                WinnerId = 2,
                EndDate = DateTime.UtcNow.AddMinutes(10),
                Bid = 50,
                IsEnded = false
            }
            );
            _dbContext.SaveChanges();
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



            var service = new AuctionMonitorService(_serviceProvider);


            // Act
            await InvokeCheckAuctionsAsync(service);
            await service.RemoveAuctionsInParticipations(1);


            // Assert
            var updatedAuction1 = _dbContext.Auctions.Find(1);
            var updatedAuction2 = _dbContext.Auctions.Find(2);
            var updatedUser1 = _dbContext.Users.Find(1);
            var updatedUser2 = _dbContext.Users.Find(2);

            Assert.Multiple(() =>
            {
                Assert.That(updatedAuction1.IsEnded, Is.True);
                Assert.That(updatedUser1.Cash, Is.EqualTo(75));
                Assert.That(updatedUser1.ParticipatedAuctionIds.Count, Is.EqualTo(0));
                Assert.That(updatedAuction2.IsEnded, Is.False);
                Assert.That(updatedUser2.Cash, Is.EqualTo(100));
                Assert.That(updatedUser2.ParticipatedAuctionIds[0], Is.EqualTo(2));
            });
        }
    }
}