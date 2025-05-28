using Backend.Classes;
using Backend.Context;
using Microsoft.AspNetCore.Http.HttpResults;
using SQLitePCL;

namespace Backend.Services
{
    public class AuctionMonitorService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly TimeSpan _interval = TimeSpan.FromMinutes(1);

        public AuctionMonitorService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await CheckAuctionsAsync();
                await Task.Delay(_interval, stoppingToken);
            }
        }

        private async Task CheckAuctionsAsync()
        {
            using var scope = _serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<WebShop24DbContext>();

            var now = DateTime.UtcNow;

            var expiredAuctions = context.Auctions.ToList()
                                    .Where(a => a.EndDate < now && a.IsEnded == false).ToList();

             foreach (var auction in expiredAuctions)
            {
                auction.IsEnded = true;
                User? user = await context.Users.FindAsync(auction.WinnerId);
                if(user == null)
                {
                    continue;
                }
                await RemoveAuctionsInParticipations(auction.ArticleId);
                user.ParticipatedAuctionIds.Remove(auction.ArticleId);
                user.Cash -= auction.Bid;
                context.Users.Update(user);
                await context.SaveChangesAsync();
            }
            await context.SaveChangesAsync();
        }

        public async Task RemoveAuctionsInParticipations(int auctionId)
        {
            using var scope = _serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<WebShop24DbContext>();

            var users = context.Users;
            foreach(var user in users)
            {
                user.ParticipatedAuctionIds.Remove(auctionId);
                context.Users.Update(user);
                await context.SaveChangesAsync();
            }
        }
    }
}
