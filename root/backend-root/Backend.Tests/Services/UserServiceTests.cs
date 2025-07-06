using Backend.Classes;
using Backend.Context;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Tests.Services
{
    [TestFixture]
    public class UserServiceTests
    {
        private WebShop24DbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<WebShop24DbContext>()
                .UseInMemoryDatabase("UserServiceTestDb_" + Guid.NewGuid())
                .Options;
            return new WebShop24DbContext(options);
        }

        private User GetTestUser()
        {
            return new User
            {
                UserId = 1,
                Username = "TestUser",
                Password = "TestPass",
                Cash = 100
            };
        }

        [Test]
        public async Task PutUser_ShouldReturnBadRequest_WhenIdDoesNotMatch()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new UserService(context);
            var user = GetTestUser();
            user.UserId = 1;

            // Act
            var result = await service.PutUser(2, user);

            // Assert
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [Test]
        public async Task PutUser_ShouldReturnNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new UserService(context);
            var user = GetTestUser();

            // Act
            var result = await service.PutUser(user.UserId, user);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result);
        }

        [Test]
        public async Task PutUser_ShouldReturnNoContent_WhenUpdateIsSuccessful()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var user = GetTestUser();
            context.Users.Add(user);
            await context.SaveChangesAsync();

            var service = new UserService(context);

            // Ändere den User
            user.Cash = 500;

            // Act
            var result = await service.PutUser(user.UserId, user);

            // Assert
            Assert.IsInstanceOf<NoContentResult>(result);

            var updatedUser = await context.Users.FindAsync(user.UserId);
            Assert.That(updatedUser.Cash, Is.EqualTo(500));
        }
    }
}
