using Backend.Context;

namespace Backend.Services;

public class DbInitializer(WebShop24DbContext webShop24DbContext)
{
    // Erstelle Datenbank, falls noch nicht erstellt
    public void Initialize()
    {
        webShop24DbContext.Database.EnsureCreated();
    }
}