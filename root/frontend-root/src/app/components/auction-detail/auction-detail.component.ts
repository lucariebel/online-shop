import { Component, inject, OnInit } from '@angular/core';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../core/services/auction.service';
import { EurFormatPipe } from '../../core/pipes/eur-format.pipe';
import { CommonModule, NgForOf } from '@angular/common';
import { AuctionBidDialogComponent } from '../auction-bid-dialog/auction-bid-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-auction-detail',
  standalone: true,
  imports: [CommonModule, EurFormatPipe, NgForOf],
  templateUrl: './auction-detail.component.html',
})
export class AuctionDetailComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  auction!: AuctionArticle | undefined;

  constructor(
    public auctionService: AuctionService,
    public userService: UserService,
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

  openDialog() {
    const currentBid = this.auction?.bid ?? 0;

    const dialogRef = this.dialog.open(AuctionBidDialogComponent, {
      data: { bid: currentBid },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result != null && this.auction) {
        const updatedAuction = {
          ...this.auction,
          bid: result,
          winnerId: this.userService.user.userId,
        };
        console.log(updatedAuction);
        try {
          await this.auctionService.putAuction(updatedAuction);
          this.auction.bid = result;
        } catch (error) {
          console.error('Fehler beim Aktualisieren der Auktion:', error);
        }
      }
    });
  }
}
