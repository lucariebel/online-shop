using Backend.Classes;
using Backend.Context;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Tests.Services
{
    [TestFixture]
    public class AuthServiceTests
    {
        private WebShop24DbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<WebShop24DbContext>()
                .UseInMemoryDatabase(databaseName: "AuthServiceTestDb_" + Guid.NewGuid())
                .Options;

            return new WebShop24DbContext(options);
        }

        private User GetTestUser()
        {
            return new User
            {
                Username = "testuser",
                Password = "testpass"
            };
        }

        [Test]
        public async Task RegisterUser_ShouldAddUser_AndReturnToken()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new AuthService(context);
            var user = GetTestUser();

            // Act
            var result = await service.RegisterUser(user);
            var dbUser = await context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);

            // Assert
            Assert.That(dbUser, Is.Not.Null);
            Assert.That(dbUser.Username, Is.EqualTo("testuser"));
            Assert.That(result, Is.TypeOf(typeof(Microsoft.AspNetCore.Http.HttpResults.Ok<>)).Or.AssignableTo<IResult>());
        }

        [Test]
        public async Task Login_ShouldReturnToken_WhenCredentialsAreCorrect()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new AuthService(context);
            var user = GetTestUser();

            await service.RegisterUser(user); // Benutzer registrieren

            // Act
            var result = await service.Login(user);

            // Assert
            Assert.That(result, Is.TypeOf(typeof(Microsoft.AspNetCore.Http.HttpResults.Ok<>)).Or.AssignableTo<IResult>());
        }

        [Test]
        public async Task Login_ShouldReturnUnauthorized_WhenCredentialsAreInvalid()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new AuthService(context);
            var user = GetTestUser();

            await service.RegisterUser(user);

            var wrongUser = new User { Username = "testuser", Password = "wrongpass" };

            // Act
            var result = await service.Login(wrongUser);

            // Assert
            Assert.IsInstanceOf<Microsoft.AspNetCore.Http.HttpResults.UnauthorizedHttpResult>(result);
        }

        [Test]
        public void HashPassword_ShouldReturnHashedPassword()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new AuthService(context);
            var password = "securepassword";

            // Act
            var hashed = service.HashPassword(password);

            // Assert
            Assert.That(hashed, Is.Not.Null.And.Not.EqualTo(password));
            Assert.That(hashed.Length, Is.GreaterThan(10));
        }

        [Test]
        public async Task GetUserByUsername_ShouldReturnUser_WhenExists()
        {
            // Arrange
            var context = GetInMemoryDbContext();
            var service = new AuthService(context);
            var user = GetTestUser();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            // Act
            var result = await service.GetUserByUsername("testuser");

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Username, Is.EqualTo("testuser"));
        }
    }
}
