import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionListComponent } from './auction-list.component';
import { AuctionService } from '../../core/services/auction.service';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AuctionListComponent', () => {
  let component: AuctionListComponent;
  let fixture: ComponentFixture<AuctionListComponent>;
  let auctionServiceMock: jasmine.SpyObj<AuctionService>;

  const mockArticles: AuctionArticle[] = Array.from({ length: 10 }).map(
    (_, i) => ({
      articleId: i + 1,
      ownerId: 1,
      owner: {
        userId: 1,
        username: 'TestUser',
        password: '123',
        cash: 100,
        participatedAuctionIds: [],
      },
      articleName: `Article ${i + 1}`,
      pictures: [`https://example.com/image${i + 1}.jpg`],
      description: 'Test article description',
      category: 'Test',
      bid: 100 + i,
      endDate: new Date(),
    }),
  );

  beforeEach(async () => {
    const auctionSpy = jasmine.createSpyObj('AuctionService', [], {
      auctionArticles: mockArticles,
    });

    await TestBed.configureTestingModule({
      imports: [AuctionListComponent, RouterTestingModule],
      providers: [{ provide: AuctionService, useValue: auctionSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionListComponent);
    component = fixture.componentInstance;
    auctionServiceMock = TestBed.inject(
      AuctionService,
    ) as jasmine.SpyObj<AuctionService>;

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
    expect(price).toContain('EUR'); // hängt vom eurFormatPipe ab
  });
});
