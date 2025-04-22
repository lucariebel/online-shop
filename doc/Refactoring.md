# Refactoring

## Interface Segregation Principle

Für jeden Service wurde ein Interface erstellt. Das führt dazu, dass einzelne Services "gemockt" werden können. Dadurch ist es möglich Tests einfacher durchzuführen.
Beispielhaft sieht das so aus:

```
public interface IArticleService
{
    Task<ActionResult<IEnumerable<DirectBuyArticle>>> GetArticles();
    Task<ActionResult<DirectBuyArticle>> GetArticle(int id);
    Task<ActionResult<IEnumerable<DirectBuyArticle>>> GetRandomArticles(int count);
    ...
}

public class ArticleService : ControllerBase, IArticleService
{
    ...
}
```
