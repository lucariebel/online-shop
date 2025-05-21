using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Classes
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public float? Cash { get; set; }
        public ICollection<DirectBuyArticle>? BoughtArticles { get; set; }
        public ICollection<AuctionArticle>? ParticipatedAuctions { get; set; }
        public ICollection<AuctionArticle>? WonAuctions { get; set; }
        // public ICollection<AuctionArticle>? OwnAuctions { get; set; } = new List<AuctionArticle>();

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
