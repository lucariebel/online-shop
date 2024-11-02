using Backend.Classes;

namespace Backend.Services
{
    public partial interface ISearchService
    {
        List<Article> SearchProducts(string name);
        List<Article> AddFilter(Filter filter);
        List<Article> AddSorting(Sorting sorting);
        List<Article> ClearFilter();
        List<Article> ClearSorting();
    }

    public partial class SearchService : ISearchService
    {
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

        public List<Article> SearchProducts(string name)
        {
            throw new NotImplementedException();
        }
    }
}
