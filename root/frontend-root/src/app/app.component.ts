import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import { ArticleService } from './core/services/article.service';
import { MatButton } from '@angular/material/button';
import { ArticleListComponent } from './components/article-list/article-list.component';
import {CreateArticleComponent} from "./components/create-article/create-article.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButton, ArticleListComponent, CreateArticleComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend-root';

  constructor(public articleService: ArticleService) {}

  async getArticles(): Promise<any> {
    await this.articleService.getArticles();
  }
}
