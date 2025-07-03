import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AuctionDetailComponent } from './auction-detail.component';
import { AuctionService } from '../../core/services/auction.service';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';

describe('AuctionDetailComponent', () => {
  let component: AuctionDetailComponent;
  let fixture: ComponentFixture<AuctionDetailComponent>;

  let auctionServiceMock: any;
  let userServiceMock: any;
  let activatedRouteMock: any;
  let matDialogMock: any;

  const mockAuction: AuctionArticle = {
    articleId: 1,
    ownerId: 2,
    owner: {
      userId: 2,
      username: 'Owner',
      password: 'pwd',
      cash: 0,
      participatedAuctionIds: [],
    },
    articleName: 'Test Auction',
    pictures: ['https://example.com/image.jpg'],
    description: 'Auction Description',
    category: 'AuctionCat',
    bid: 100,
    endDate: new Date('2025-12-31'),
  };

  const mockUser = {
    userId: 10,
    username: 'Bidder',
    password: 'pwd',
    cash: 500,
    participatedAuctionIds: [],
  };

  beforeEach(async () => {
    auctionServiceMock = {
      auctionArticles: [mockAuction],
      loadAuctionArticles: jasmine
        .createSpy('loadAuctionArticles')
        .and.returnValue(Promise.resolve()),
      putAuction: jasmine
        .createSpy('putAuction')
        .and.returnValue(Promise.resolve()),
    };

    userServiceMock = {
      user: { ...mockUser },
      putUser: jasmine.createSpy('putUser').and.returnValue(Promise.resolve()),
    };

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'),
        },
      },
    };

    const dialogRefMock = {
      afterClosed: () => of(150),
    };

    matDialogMock = {
      open: jasmine.createSpy('open').and.returnValue(dialogRefMock),
    };

    await TestBed.configureTestingModule({
      imports: [AuctionDetailComponent],
      providers: [
        { provide: AuctionService, useValue: auctionServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create and load auction on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(auctionServiceMock.loadAuctionArticles).toHaveBeenCalled();
    expect(component.auction).toEqual(mockAuction);
  }));

  it('should set auction undefined if id not found', fakeAsync(() => {
    activatedRouteMock.snapshot.paramMap.get.and.returnValue('999');
    component.ngOnInit();
    tick();
    expect(component.auction).toBeUndefined();
  }));

  it('should open dialog and update auction bid and user participation', fakeAsync(async () => {
    component.auction = { ...mockAuction };
    userServiceMock.user.participatedAuctionIds = [];

    component.openDialog();
    expect(matDialogMock.open).toHaveBeenCalled();

    tick();

    expect(userServiceMock.user.participatedAuctionIds).toContain(
      mockAuction.articleId,
    );
    expect(userServiceMock.putUser).toHaveBeenCalled();
    expect(auctionServiceMock.putAuction).toHaveBeenCalledWith(
      jasmine.objectContaining({
        bid: 150,
        winnerId: userServiceMock.user.userId,
      }),
    );
    expect(component.auction.bid).toBe(150);
  }));

  it('should handle no result from dialog without changes', fakeAsync(() => {
    matDialogMock.open.and.returnValue({
      afterClosed: () => of(null),
    });

    component.auction = { ...mockAuction };
    component.openDialog();
    tick();

    expect(userServiceMock.putUser).not.toHaveBeenCalled();
    expect(auctionServiceMock.putAuction).not.toHaveBeenCalled();
    expect(component.auction.bid).toBe(mockAuction.bid);
  }));

  it('should catch errors when updating user', fakeAsync(async () => {
    userServiceMock.putUser.and.returnValue(
      Promise.reject('update user error'),
    );
    component.auction = { ...mockAuction };
    userServiceMock.user.participatedAuctionIds = [];

    spyOn(console, 'error');

    component.openDialog();
    tick();

    expect(console.error).toHaveBeenCalledWith(
      'Fehler beim Aktualisieren der Auktion:',
      'update user error',
    );
  }));

  it('should catch errors when updating auction', fakeAsync(async () => {
    auctionServiceMock.putAuction.and.returnValue(
      Promise.reject('update auction error'),
    );
    component.auction = { ...mockAuction };
    userServiceMock.user.participatedAuctionIds = [mockAuction.articleId];

    spyOn(console, 'error');

    component.openDialog();
    tick();

    expect(console.error).toHaveBeenCalledWith(
      'Fehler beim Aktualisieren der Auktion:',
      'update auction error',
    );
  }));
});
