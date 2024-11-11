import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ArticleService } from './core/services/article.service';
import { MatButton } from '@angular/material/button';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButton,
    ArticleListComponent,
    CreateArticleComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontend-root';

  constructor(public articleService: ArticleService) {}

  ngOnInit() {
    this.getArticles();
  }

  private getArticles() {
    this.articleService.getArticles().then((articles) => {
      this.articleService.directBuyArticles = articles;
    });
  }
}
