﻿using Backend.Classes;
using Microsoft.EntityFrameworkCore;

namespace Backend.Context
{
    public class WebShop24DbContext(DbContextOptions<WebShop24DbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<DirectBuyArticle> Articles { get; set; }
        public DbSet<AuctionArticle> Auctions { get; set; }
    }
}
