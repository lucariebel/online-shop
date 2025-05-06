import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { EurFormatPipe } from '../../core/pipes/eur-format.pipe';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auction-bid-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    EurFormatPipe,
    MatFormField,
    MatInput,
    MatPrefix,
    FormsModule,
  ],
  templateUrl: './auction-bid-dialog.component.html',
})
export class AuctionBidDialogComponent {
  userBid: number = 0;
  minBid: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AuctionArticle | undefined,
    private dialogRef: MatDialogRef<AuctionBidDialogComponent>,
  ) {
    const baseBid = data?.bid ?? 0;
    this.minBid = parseFloat((baseBid * 1.05).toFixed(2));
  }

  submitBid() {
    if (this.userBid >= this.minBid) {
      this.dialogRef.close(this.userBid);
    }
  }
}
