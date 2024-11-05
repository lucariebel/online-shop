using Backend.Context;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class DbInitializer(WebShop24DbContext webShop24DbContext)
{
    // Erstelle Datenbank, falls noch nicht erstellt
    public void Initialize()
    {
        webShop24DbContext.Database.EnsureCreated();
        
        // InsertUpgradeDataToDb();
    }

    //public void InsertUpgradeDataToDb()
    //{
    //    var path = Path.Combine(Directory.GetCurrentDirectory(), "./Services/initDb.sql");
    //    string[] sql = File.ReadAllLines(path);

    //    foreach (var item in sql)
    //    {
    //        shopDbContext.Database.ExecuteSqlRawAsync(item);
    //    }
    //}
}