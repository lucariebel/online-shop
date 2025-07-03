import { Component } from '@angular/core';
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
    RouterLink,
  ],
  templateUrl: './article-search-list.component.html',
})
export class ArticleSearchListComponent {
  constructor(public searchService: SearchService) {}
}
