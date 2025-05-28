import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateArticleComponent } from './create-article.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ArticleService } from '../../core/services/article.service';
import { ImageUploadService } from '../../core/services/image-upload.service';
import { UserService } from '../../core/services/user.service';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectBuyArticle } from '../../core/interfaces/DirectBuyArticle';
describe('CreateArticleComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;
  let articleService: jasmine.SpyObj<ArticleService>;
  let imageService: jasmine.SpyObj<ImageUploadService>;
  let authService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const articleServiceSpy = jasmine.createSpyObj('ArticleService', [
      'postArticle',
    ]);
    const imageServiceSpy = jasmine.createSpyObj('ImageUploadService', [
      'compressMultipleFiles',
    ]);
    const authServiceSpy = jasmine.createSpyObj('UserService', ['user']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CreateArticleComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: ArticleService, useValue: articleServiceSpy },
        { provide: ImageUploadService, useValue: imageServiceSpy },
        { provide: UserService, useValue: authServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: {} } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateArticleComponent);
    component = fixture.componentInstance;
    articleService = TestBed.inject(
      ArticleService,
    ) as jasmine.SpyObj<ArticleService>;
    imageService = TestBed.inject(
      ImageUploadService,
    ) as jasmine.SpyObj<ImageUploadService>;
    authService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    authService.user = {
      userId: 1,
      username: 'TestUser',
      password: '123',
      cash: 100,
      participatedAuctionIds: [],
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with the correct controls', () => {
    expect(component.articleForm.contains('articleName')).toBeTrue();
    expect(component.articleForm.contains('category')).toBeTrue();
    expect(component.articleForm.contains('price')).toBeTrue();
    expect(component.articleForm.contains('pictures')).toBeTrue();
    expect(component.articleForm.contains('description')).toBeTrue();
  });

  it('should submit the form and post the article', async () => {
    const mockArticle = {
      articleName: 'Test Article',
      category: 'Electronics',
      price: 100,
      pictures: [],
      description: 'This is a test article',
    };

    component.articleForm.setValue(mockArticle);

    const mockDirectBuyArticles: DirectBuyArticle[] = [];
    articleService.directBuyArticles = mockDirectBuyArticles;

    articleService.postArticle.and.returnValue(Promise.resolve(mockArticle));

    component.onSubmit();

    await fixture.whenStable();

    expect(articleService.postArticle).toHaveBeenCalled();

    expect(mockDirectBuyArticles.length).toBeGreaterThan(0);
  });

  it('should add images to the article', async () => {
    const mockImages: string[] = ['image1.jpg', 'image2.jpg'];

    imageService.compressMultipleFiles.and.returnValue(
      Promise.resolve(mockImages),
    );

    component.addImgToArticle();

    await fixture.whenStable();

    expect(imageService.compressMultipleFiles).toHaveBeenCalled();

    expect(component.newArticle.pictures.length).toBe(2);
    expect(component.newArticle.pictures).toEqual(mockImages);
  });

  it('should not add images if the imageService fails', () => {
    imageService.compressMultipleFiles.and.returnValue(Promise.reject('Error'));

    component.addImgToArticle();

    expect(imageService.compressMultipleFiles).toHaveBeenCalled();
    expect(component.newArticle.pictures.length).toBe(0);
  });
});
