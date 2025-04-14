import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../core/services/article.service';
import { DirectBuyArticle } from '../../core/interfaces/DirectBuyArticle';
import { EurFormatPipe } from '../../core/pipes/eur-format.pipe';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [EurFormatPipe, NgForOf],
  templateUrl: './article-detail.component.html',
})
export class ArticleDetailComponent implements OnInit {
  article!: DirectBuyArticle | undefined;

  constructor(
    public articleService: ArticleService,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    await this.articleService.loadDirectBuyArticles();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.article = this.articleService.directBuyArticles.find(
      (item) => item.articleId === id,
    );
    console.log(this.article!.pictures.length);
    if (!this.article) {
      console.error(`Artikel mit ID ${id} nicht gefunden!`);
      // this.router.navigate(['/not-found']);
    }
  }
}
