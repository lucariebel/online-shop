using Backend.Classes;

namespace Backend.Services
{
    public partial interface ISaleService
    {
        Article CreateArticle(Article article);
        void DeleteArticle(Article article);
        void BuyArticle(Article article);

    }
    public class SaleService : ISaleService
    {
        public void BuyArticle(Article article)
        {
            throw new NotImplementedException();
        }

        public Article CreateArticle(Article article)
        {
            throw new NotImplementedException();
        }

        public void DeleteArticle(Article article)
        {
            throw new NotImplementedException();
        }
    }
}
