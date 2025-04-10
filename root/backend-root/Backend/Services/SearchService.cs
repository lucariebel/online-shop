using Backend.Classes;
using Backend.Context;

namespace Backend.Services
{
    public partial interface ISearchService
    {
        List<Article> AddFilter(Filter filter);
        List<Article> AddSorting(Sorting sorting);
        List<Article> ClearFilter();
        List<Article> ClearSorting();
        List<DirectBuyArticle> GetDirectBuyArticleSearch(string name);
    }

    public partial class SearchService : ISearchService
    {
        private readonly WebShop24DbContext _context;
        public SearchService(WebShop24DbContext context)
        {
            _context = context;
        }
        public List<Article> AddFilter(Filter filter)
        {
            throw new NotImplementedException();
        }

        public List<Article> AddSorting(Sorting sorting)
        {
            throw new NotImplementedException();
        }

        public List<Article> ClearFilter()
        {
            throw new NotImplementedException();
        }

        public List<Article> ClearSorting()
        {
            throw new NotImplementedException();
        }

        public List<DirectBuyArticle> GetDirectBuyArticleSearch(string name)
        {
            List<DirectBuyArticle> directBuyArticles = [];
            directBuyArticles = _context.Articles.Where(a => a.ArticleName.ToLower().Contains(name.ToLower())).ToList();
            return directBuyArticles;
        }
    }
}
