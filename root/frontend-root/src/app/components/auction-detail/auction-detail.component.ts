import { Component, OnInit } from '@angular/core';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../core/services/auction.service';
import { EurFormatPipe } from '../../core/pipes/eur-format.pipe';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auction-detail',
  standalone: true,
  imports: [CommonModule, EurFormatPipe, NgForOf],
  templateUrl: './auction-detail.component.html',
})
export class AuctionDetailComponent implements OnInit {
  auction!: AuctionArticle | undefined;

  constructor(
    public auctionService: AuctionService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    await this.auctionService.loadAuctionArticles();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.auction = this.auctionService.auctionArticles.find(
      (item: AuctionArticle) => item.articleId === id,
    );
    if (!this.auction) {
      console.error(`Artikel mit ID ${id} nicht gefunden!`);
      // this.router.navigate(['/not-found']);
    }
  }
}
