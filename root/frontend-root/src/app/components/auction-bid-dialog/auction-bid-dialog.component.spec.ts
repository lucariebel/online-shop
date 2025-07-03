import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuctionBidDialogComponent } from './auction-bid-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuctionArticle } from '../../core/interfaces/AuctionArticle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

describe('AuctionBidDialogComponent', () => {
  let component: AuctionBidDialogComponent;
  let fixture: ComponentFixture<AuctionBidDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AuctionBidDialogComponent>>;

  const mockArticle: AuctionArticle = {
    articleId: 1,
    ownerId: 1,
    owner: {
      userId: 1,
      username: 'TestUser',
      password: '',
      cash: 100,
      participatedAuctionIds: [],
    },
    articleName: 'Testartikel',
    pictures: ['pic.jpg'],
    description: 'Beschreibung',
    category: 'Allgemein',
    bid: 100,
    endDate: new Date(),
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        AuctionBidDialogComponent,
        FormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockArticle },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuctionBidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate minBid correctly as 105% of current bid', () => {
    expect(component.minBid).toBe(105); // 100 * 1.05
  });

  it('should disable submit button if userBid < minBid', () => {
    component.userBid = 100; // weniger als 105
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(By.css('button'))[1]
      .nativeElement;
    expect(button?.disabled).toBeTrue();
  });

  it('should enable submit button if userBid >= minBid', () => {
    component.userBid = 110;
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(By.css('button'))[1]
      .nativeElement;
    expect(button.disabled).toBeFalse();
  });

  it('should close dialog with bid on valid submit', () => {
    component.userBid = 110;
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(By.css('button'))[1];
    button.triggerEventHandler('click');
    expect(dialogRefSpy.close).toHaveBeenCalledWith(110);
  });

  it('should not close dialog if userBid < minBid', () => {
    component.userBid = 90;
    fixture.detectChanges();
    component.submitBid();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
