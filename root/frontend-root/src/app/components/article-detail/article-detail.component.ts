import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
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

  async directBuyArticleSubmit(): Promise<void> {
    if (!this.article) {
      return;
    }
  
    this.article.isAvailable = false;
  
    try {
      const response: any = await this.articleService.putArticle(this.article.articleId, this.article);
      console.log('Artikel wurde als gekauft markiert und erfolgreich aktualisiert.', response);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Fehler beim Aktualisieren des Artikelstatus:', error);
    }
  }
}
