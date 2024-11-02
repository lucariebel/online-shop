using Backend.Classes;

namespace Backend.Services
{
    public partial interface IAuctionService
    {
        Auction CreateAuction(Auction auction);
        void DeleteAuction(Auction auction);
        void NewBid(Auction auction, float bid, int userId);
        void EndAuction(Auction auction);
    }
    public partial class AuctionService : IAuctionService
    {
        public Auction CreateAuction(Auction auction)
        {
            throw new NotImplementedException();
        }

        public void DeleteAuction(Auction auction)
        {
            throw new NotImplementedException();
        }

        public void EndAuction(Auction auction)
        {
            throw new NotImplementedException();
        }

        public void NewBid(Auction auction, float bid, int userId)
        {
            throw new NotImplementedException();
        }
    }
}
