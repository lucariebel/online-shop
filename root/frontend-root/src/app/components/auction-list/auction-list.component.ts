import { Component } from '@angular/core';
import { EurFormatPipe } from '../../core/pipes/eur-format.pipe';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { SlicePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AuctionService } from '../../core/services/auction.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auction-list',
  standalone: true,
  imports: [
    MatIcon,
    SlicePipe,
    MatCard,
    MatCardContent,
    MatIconButton,
    MatCardImage,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    EurFormatPipe,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './auction-list.component.html',
})
export class AuctionListComponent {
  articlePosition = 0;

  constructor(public auctionService: AuctionService) {}
}
