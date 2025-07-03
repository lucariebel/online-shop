import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleService } from '../../core/services/article.service';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectBuyArticle } from '../../core/interfaces/DirectBuyArticle';
import { User } from '../../core/interfaces/User';

describe('ArticleDetailComponent', () => {
  let component: ArticleDetailComponent;
  let fixture: ComponentFixture<ArticleDetailComponent>;

  let articleServiceMock: any;
  let userServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  const mockUser: User = {
    userId: 1,
    username: 'TestUser',
    password: 'pwd',
    cash: 200,
    participatedAuctionIds: [],
  };

  const mockArticle: DirectBuyArticle = {
    articleId: 1,
    ownerId: 2,
    owner: mockUser,
    articleName: 'Test Article',
    pictures: ['https://example.com/image.jpg'],
    description: 'Test Description',
    category: 'Test',
    price: 100,
    isAvailable: true,
  };

  beforeEach(async () => {
    articleServiceMock = {
      directBuyArticles: [mockArticle],
      loadDirectBuyArticles: jasmine
        .createSpy('loadDirectBuyArticles')
        .and.returnValue(Promise.resolve()),
      putArticle: jasmine
        .createSpy('putArticle')
        .and.returnValue(Promise.resolve(mockArticle)),
    };

    userServiceMock = {
      user: { ...mockUser },
      putUser: jasmine.createSpy('putUser').and.returnValue(Promise.resolve()),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ArticleDetailComponent],
      providers: [
        { provide: ArticleService, useValue: articleServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create component and load article on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(articleServiceMock.loadDirectBuyArticles).toHaveBeenCalled();
    expect(component.article).toEqual(mockArticle);
  }));

  it('should not proceed buying if article is undefined', async () => {
    component.article = undefined;
    await component.directBuyArticleSubmit();
    expect(userServiceMock.putUser).not.toHaveBeenCalled();
    expect(articleServiceMock.putArticle).not.toHaveBeenCalled();
  });

  it('should not proceed buying if price is undefined', async () => {
    component.article = { ...mockArticle, price: null as any };
    await component.directBuyArticleSubmit();
    expect(userServiceMock.putUser).not.toHaveBeenCalled();
    expect(articleServiceMock.putArticle).not.toHaveBeenCalled();
  });

  it('should not proceed buying if user cash insufficient', async () => {
    userServiceMock.user.cash = 50;
    component.article = mockArticle;
    await component.directBuyArticleSubmit();
    expect(userServiceMock.putUser).not.toHaveBeenCalled();
    expect(articleServiceMock.putArticle).not.toHaveBeenCalled();
  });

  it('should buy article successfully and navigate home', async () => {
    userServiceMock.user.cash = 200;
    component.article = { ...mockArticle };
    await component.directBuyArticleSubmit();

    expect(userServiceMock.putUser).toHaveBeenCalled();
    expect(articleServiceMock.putArticle).toHaveBeenCalledWith(
      mockArticle.articleId,
      jasmine.objectContaining({
        isAvailable: false,
        buyerId: userServiceMock.user.userId,
        buyer: userServiceMock.user,
      }),
    );

    expect(userServiceMock.user.cash).toBe(100); // 200 - 100
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle error on buying article gracefully', async () => {
    userServiceMock.user.cash = 200;
    component.article = { ...mockArticle };
    userServiceMock.putUser.and.returnValue(Promise.reject('error'));
    articleServiceMock.putArticle.and.returnValue(Promise.reject('error'));

    await component.directBuyArticleSubmit();

    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
