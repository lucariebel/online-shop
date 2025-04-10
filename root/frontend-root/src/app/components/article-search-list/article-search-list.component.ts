import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SearchService } from '../../core/services/search.service';
import { DirectBuyArticle } from '../../core/interfaces/DirectBuyArticle';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { EurFormatPipe } from '../../core/pipes/eur-format.pipe';
@Component({
  selector: 'app-article-search-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    EurFormatPipe,
  ],
  templateUrl: './article-search-list.component.html',
  styleUrl: './article-search-list.component.scss',
})
export class ArticleSearchListComponent {
  public articleList: DirectBuyArticle[] = [];
  constructor(public searchService: SearchService) {}
}
