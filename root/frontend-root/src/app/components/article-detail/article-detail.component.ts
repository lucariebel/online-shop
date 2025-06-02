import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../core/services/article.service';
import { DirectBuyArticle } from '../../core/interfaces/DirectBuyArticle';
import { UserService } from '../../core/services/user.service';
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
    private userService: UserService,
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

    const articlePrice = this.article.price;
    if (articlePrice == null) {
      console.error('Kein Preis für diesen Artikel definiert!');
      return;
    }

    const currentUser = this.userService.user;
    if (currentUser.cash == null || currentUser.cash < articlePrice) {
      console.error('Nicht genügend Guthaben vorhanden!');
      return;
    }

    currentUser.cash -= articlePrice;

    this.article.isAvailable = false;

    try {
      await this.userService.putUser(currentUser);
      this.article.buyerId = currentUser.userId;
      this.article.buyer = currentUser;
      await this.articleService.putArticle(
        this.article.articleId,
        this.article,
      );

      console.log(
        'Artikel wurde als gekauft markiert und der Betrag wurde abgezogen.',
      );
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error(
        'Fehler beim Kauf des Artikels oder Aktualisieren des Nutzerkontos:',
        error,
      );
    }
  }
}
