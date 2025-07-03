import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleSearchListComponent } from './article-search-list.component';
import { SearchService } from '../../core/services/search.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { DebugElement } from '@angular/core';

describe('ArticleSearchListComponent', () => {
  let component: ArticleSearchListComponent;
  let fixture: ComponentFixture<ArticleSearchListComponent>;
  let searchServiceMock: any;

  const mockArticles = [
    {
      articleId: 1,
      articleName: 'Artikel Eins',
      price: 123.45,
      pictures: ['https://example.com/image1.jpg'],
    },
    {
      articleId: 2,
      articleName: 'Artikel Zwei',
      price: 678.9,
      pictures: ['https://example.com/image2.jpg'],
    },
  ];

  beforeEach(async () => {
    searchServiceMock = {
      articles: mockArticles,
    };

    await TestBed.configureTestingModule({
      imports: [ArticleSearchListComponent, RouterTestingModule, MatCardModule],
      providers: [{ provide: SearchService, useValue: searchServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of article cards', () => {
    const articleCards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(articleCards.length).toBe(mockArticles.length);
  });

  it('should display article names and prices correctly', () => {
    const articleNameEls: DebugElement[] = fixture.debugElement.queryAll(
      By.css('mat-card-subtitle'),
    );
    const articlePriceEls: DebugElement[] = fixture.debugElement.queryAll(
      By.css('mat-card-title'),
    );

    mockArticles.forEach((article, i) => {
      expect(articleNameEls[i].nativeElement.textContent.trim()).toBe(
        article.articleName,
      );
      expect(articlePriceEls[i].nativeElement.textContent.trim()).toContain(
        article.price.toFixed(2).replace('.', ','),
      );
    });
  });

  it('should display article image src correctly', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    mockArticles.forEach((article, i) => {
      expect(images[i].nativeElement.src).toContain(article.pictures[0]);
    });
  });
});
