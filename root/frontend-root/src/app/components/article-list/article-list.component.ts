import { Component } from '@angular/core';
import { ArticleService } from '../../core/services/article.service';
import { MatIcon } from '@angular/material/icon';
import { SlicePipe } from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { EurFormatPipe } from '../../core/pipes/eur-format.pipe';

@Component({
  selector: 'app-article-list',
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
  ],
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent {
  articlePosition = 0;

  constructor(public articleService: ArticleService) {}
}
