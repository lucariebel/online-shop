namespace Backend.Classes
{
    public partial class Article
    {
        public int ArticleId { get; set; }
        public int UserId { get; set; }
        public string ArticleName { get; set; }
        public List<Picture> Pictures { get; set; }
        public string Description { get; set; }
    }

    public partial class DirectBuyArticle : Article
    {
        public float Price { get; set; }
    }

    public partial class AuctionArticle : Article
    {
        public int WinnerId { get; set; }
        public DateTime EndDate { get; set; }
        public float Bid { get; set; }
    }
}
