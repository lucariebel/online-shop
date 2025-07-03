import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleListComponent } from './article-list.component';
import { ArticleService } from '../../core/services/article.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DirectBuyArticle } from '../../core/interfaces/DirectBuyArticle';
import { User } from '../../core/interfaces/User';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let articleServiceMock: jasmine.SpyObj<ArticleService>;

  const mockUser: User = {
    userId: 1,
    username: 'TestUser',
    password: '123',
    cash: 100,
    participatedAuctionIds: [],
  };

  const mockArticles: DirectBuyArticle[] = Array.from({ length: 10 }).map(
    (_, i) =>
      ({
        articleId: i + 1,
        ownerId: 1,
        owner: mockUser,
        articleName: `Article ${i + 1}`,
        pictures: [`https://example.com/image${i + 1}.jpg`],
        description: 'Test description',
        category: 'TestCategory',
        price: 100 + i,
        isAvailable: true,
      }) as DirectBuyArticle,
  );

  beforeEach(async () => {
    const articleSpy = jasmine.createSpyObj('ArticleService', [], {
      directBuyArticles: mockArticles,
    });

    await TestBed.configureTestingModule({
      imports: [ArticleListComponent, RouterTestingModule],
      providers: [{ provide: ArticleService, useValue: articleSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    articleServiceMock = TestBed.inject(
      ArticleService,
    ) as jasmine.SpyObj<ArticleService>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 articles initially', () => {
    const cards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(cards.length).toBe(5);
  });

  it('should disable back button at start', () => {
    const backButton = fixture.debugElement.queryAll(By.css('button'))[0];
    expect(backButton.nativeElement.disabled).toBeTrue();
  });

  it('should enable forward button at start', () => {
    const forwardButton = fixture.debugElement.queryAll(By.css('button'))[1];
    expect(forwardButton.nativeElement.disabled).toBeFalse();
  });

  it('should increase articlePosition on next button click', () => {
    const forwardButton = fixture.debugElement.queryAll(By.css('button'))[1];
    forwardButton.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.articlePosition).toBe(1);
  });

  it('should decrease articlePosition on back button click after forward', () => {
    const forwardButton = fixture.debugElement.queryAll(By.css('button'))[1];
    forwardButton.triggerEventHandler('click');
    fixture.detectChanges();

    const backButton = fixture.debugElement.queryAll(By.css('button'))[0];
    backButton.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.articlePosition).toBe(0);
  });

  it('should disable forward button when at end of list', () => {
    component.articlePosition = 5;
    fixture.detectChanges();

    const forwardButton = fixture.debugElement.queryAll(By.css('button'))[1];
    expect(forwardButton.nativeElement.disabled).toBeTrue();
  });

  it('should render article data correctly', () => {
    const firstCard = fixture.debugElement.query(By.css('mat-card'));
    const title = firstCard.query(By.css('mat-card-subtitle')).nativeElement
      .textContent;
    const price = firstCard.query(By.css('mat-card-title')).nativeElement
      .textContent;

    expect(title).toContain('Article 1');
    expect(price).toContain('EUR'); // abhängig vom EurFormatPipe
  });
});
