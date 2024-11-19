import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ArticleService } from './core/services/article.service';
import { AuctionService } from './core/services/auction.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    public articleService: ArticleService,
    public auctionService: AuctionService,
  ) {}

  ngOnInit() {
    this.getArticles();
    this.getAuctions();
  }

  private getArticles() {
    this.articleService.getRandomArticles(10).then((articles) => {
      this.articleService.directBuyArticles = articles;
    });
  }

  private getAuctions() {
    this.auctionService.getRandomAuctions(10).then((auctions) => {
      this.auctionService.auctionArticles = auctions;
    });
  }
}
