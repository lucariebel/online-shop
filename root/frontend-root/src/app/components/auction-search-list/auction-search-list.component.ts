import { Component } from '@angular/core';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { SearchService } from '../../core/services/search.service';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { EurFormatPipe } from '../../core/pipes/eur-format.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auction-search-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    EurFormatPipe,
    RouterLink,
  ],
  templateUrl: './auction-search-list.component.html',
  styleUrl: './auction-search-list.component.scss',
})
export class AuctionSearchListComponent {
  public auctionArticleList: AuctionArticle[] = [];
  constructor(public searchService: SearchService) {}
}
