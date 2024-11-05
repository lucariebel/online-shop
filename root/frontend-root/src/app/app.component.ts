import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ArticleService } from './components/core/services/article.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
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
