import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAuctionComponent } from './create-auction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuctionService } from '../../core/services/auction.service';
import { ImageUploadService } from '../../core/services/image-upload.service';
import { UserService } from '../../core/services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';

describe('CreateAuctionComponent', () => {
  let component: CreateAuctionComponent;
  let fixture: ComponentFixture<CreateAuctionComponent>;
  let auctionService: jasmine.SpyObj<AuctionService>;
  let imageService: jasmine.SpyObj<ImageUploadService>;
  let userService: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const auctionServiceSpy = jasmine.createSpyObj(
      'AuctionService',
      ['postAuction'],
      {
        auctionArticles: [],
      },
    );
    const imageServiceSpy = jasmine.createSpyObj('ImageUploadService', [
      'compressMultipleFiles',
    ]);
    const userServiceSpy = jasmine.createSpyObj('UserService', [], {
      user: {
        userId: 1,
        username: 'TestUser',
        password: '123',
        cash: 100,
        participatedAuctionIds: [],
      },
    });
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CreateAuctionComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
        { provide: AuctionService, useValue: auctionServiceSpy },
        { provide: ImageUploadService, useValue: imageServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAuctionComponent);
    component = fixture.componentInstance;
    auctionService = TestBed.inject(
      AuctionService,
    ) as jasmine.SpyObj<AuctionService>;
    imageService = TestBed.inject(
      ImageUploadService,
    ) as jasmine.SpyObj<ImageUploadService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should post an auction on submit and navigate to home', async () => {
    const mockAuction: AuctionArticle = {
      articleId: 1,
      ownerId: 1,
      owner: userService.user,
      articleName: 'Auction Item',
      category: 'Electronics',
      endDate: new Date(),
      description: 'Test description',
      pictures: [],
      bid: 1,
    };

    component.newAuction = mockAuction;
    auctionService.postAuction.and.returnValue(Promise.resolve(mockAuction));

    component.onSubmit();
    await fixture.whenStable();

    expect(auctionService.postAuction).toHaveBeenCalledWith(mockAuction);
    expect(auctionService.auctionArticles.length).toBeGreaterThan(0);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should add images to the auction', async () => {
    const mockImages = ['img1.jpg', 'img2.jpg'];
    imageService.compressMultipleFiles.and.returnValue(
      Promise.resolve(mockImages),
    );

    component.addImgToArticle();
    await fixture.whenStable();

    expect(imageService.compressMultipleFiles).toHaveBeenCalled();
    expect(component.newAuction.pictures).toEqual(mockImages);
  });

  it('should not add images if the image service fails', async () => {
    imageService.compressMultipleFiles.and.returnValue(Promise.reject('Error'));

    try {
      await component.addImgToArticle();
    } catch {
      // Fehler ignorieren, wir testen nur, ob keine Bilder hinzugefügt wurden
    }

    expect(imageService.compressMultipleFiles).toHaveBeenCalled();
    expect(component.newAuction.pictures.length).toBe(0);
  });

  it('should set time to date correctly', () => {
    component.newAuction.endDate = new Date('2025-01-01T00:00:00');
    component.setTimeToDate('15:30');

    const resultDate = component.newAuction.endDate;

    expect(resultDate.getHours()).toBe(15);
    expect(resultDate.getMinutes()).toBe(30);
  });
});
