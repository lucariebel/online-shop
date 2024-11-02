namespace Backend.Classes
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public float Cash { get; set; }
        public List<Auction> BoughtAuctions { get; set; }
        public List<Auction> OwnAuctions { get; set; }
        public List<Auction> ParticipatedAuctions { get; set; }
        public Boolean IsLoggedIn { get; set; }

        public void AddAuction(List<Auction> auctions, Auction auction)
        {
            auctions.Add(auction);
        }

        public void RemoveAuction(List<Auction> auctions, Auction auction)
        {
            auctions.Remove(auction);
        }

        public void AddCash(float cash)
        {
            this.Cash += cash;
        }

        public void RemoveCash(float cash)
        {
            this.Cash -= cash;
        }
    }
}
