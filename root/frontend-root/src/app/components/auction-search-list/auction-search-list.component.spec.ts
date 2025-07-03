import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionSearchListComponent } from './auction-search-list.component';
import { SearchService } from '../../core/services/search.service';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AuctionSearchListComponent', () => {
  let component: AuctionSearchListComponent;
  let fixture: ComponentFixture<AuctionSearchListComponent>;
  let searchServiceMock: jasmine.SpyObj<SearchService>;

  const mockAuction: AuctionArticle = {
    articleId: 1,
    ownerId: 1,
    articleName: 'Mock Auction Item',
    pictures: ['https://example.com/image.jpg'],
    description: 'Some description',
    category: 'Electronics',
    bid: 123.45,
    endDate: new Date(),
    owner: {
      userId: 1,
      username: 'testuser',
      password: '',
      cash: 1000,
      participatedAuctionIds: [],
    },
  };

  beforeEach(async () => {
    const searchSpy = jasmine.createSpyObj('SearchService', [], {
      auctions: [mockAuction],
    });

    await TestBed.configureTestingModule({
      imports: [AuctionSearchListComponent, RouterTestingModule],
      providers: [{ provide: SearchService, useValue: searchSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionSearchListComponent);
    component = fixture.componentInstance;
    searchServiceMock = TestBed.inject(
      SearchService,
    ) as jasmine.SpyObj<SearchService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the auction article name', () => {
    const element = fixture.debugElement.query(By.css('mat-card-subtitle'));
    expect(element.nativeElement.textContent).toContain('Mock Auction Item');
  });

  it('should display the formatted bid', () => {
    const element = fixture.debugElement.query(By.css('mat-card-title'));
    expect(element.nativeElement.textContent).toContain('EUR'); // falls EurFormatPipe € verwendet
  });

  it('should show the auction image', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.src).toBe('https://example.com/image.jpg');
  });
});
