import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { HeaderService } from '../../core/services/header.service';
import { SearchService } from '../../core/services/search.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectBuyArticle } from '../../core/interfaces/DirectBuyArticle';
import { User } from '../../core/interfaces/User';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockHeaderService: jasmine.SpyObj<HeaderService>;
  let mockSearchService: jasmine.SpyObj<SearchService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    mockUserService = jasmine.createSpyObj('UserService', ['getUser']);
    mockHeaderService = jasmine.createSpyObj('HeaderService', ['toggleWindow']);
    mockSearchService = jasmine.createSpyObj('SearchService', [
      'articleSearchString',
      'searchArticle',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        HeaderComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: HeaderService, useValue: mockHeaderService },
        { provide: SearchService, useValue: mockSearchService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the article search form', () => {
    expect(component.articleSearchForm).toBeDefined();
    expect(component.articleSearchForm.get('searchString')).toBeTruthy();
  });

  it('should toggle the account header when toggleWindow is called', () => {
    const event = new Event('click');
    component.toggleWindow(event);
    expect(mockHeaderService.isAccountHeaderExpanded).toBeTrue();
  });

  it('should call searchService.searchArticle when submitArticleSearch is called', async () => {
    const mockArticles: DirectBuyArticle[] = [
      {
        articleId: 1,
        articleName: 'Test Article',
        price: 100,
        category: 'Test Category',
        isAvailable: true,
        description: 'Test Description',
        userId: 1,
        pictures: [],
        user: { userId: 1, username: 'Test User' } as User,
      },
    ] as DirectBuyArticle[];

    mockSearchService.searchArticle.and.returnValue(of(mockArticles));

    component.articleSearchForm.setValue({ searchString: 'Test' });

    component.submitArticleSearch();
    await fixture.whenStable();
    expect(mockSearchService.articleSearchString).toBe('Test');
    expect(mockSearchService.searchArticle).toHaveBeenCalledWith('Test');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('article-search');
    expect(component.searchService.articles).toEqual(mockArticles);
  });
});
