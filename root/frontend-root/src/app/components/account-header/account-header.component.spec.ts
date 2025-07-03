import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AccountHeaderComponent } from './account-header.component';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { HeaderService } from '../../core/services/header.service';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { EurFormatPipe } from '../../core/pipes/eur-format.pipe';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AccountHeaderComponent', () => {
  let component: AccountHeaderComponent;
  let fixture: ComponentFixture<AccountHeaderComponent>;
  let userServiceMock: any;
  let authServiceMock: any;
  let headerServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      user: { username: 'testuser', cash: 100, userId: 1 },
      putUser: jasmine.createSpy('putUser').and.returnValue(Promise.resolve()),
    };
    authServiceMock = {
      isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(true),
      logout: jasmine.createSpy('logout'),
    };
    headerServiceMock = {
      isAccountHeaderExpanded: true,
    };

    await TestBed.configureTestingModule({
      imports: [
        AccountHeaderComponent,
        FormsModule,
        MatButtonModule,
        EurFormatPipe,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: HeaderService, useValue: headerServiceMock },
        {
          provide: ElementRef,
          useValue: { nativeElement: document.createElement('div') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show username and cash when logged in', () => {
    const usernameEl = fixture.debugElement.query(By.css('p'));
    expect(usernameEl.nativeElement.textContent).toContain('testuser');

    const cashEl = fixture.debugElement.queryAll(By.css('p'))[1];
    expect(cashEl.nativeElement.textContent).toContain('100');
  });

  it('should disable "Hinzufügen" button when cashToAdd is null or results in negative cash', () => {
    component.cashToAdd = undefined;
    fixture.detectChanges();
    let button = fixture.debugElement.query(
      By.css('button[mat-raised-button]'),
    );
    expect(button.nativeElement.disabled).toBeTrue();

    component.cashToAdd = -200; // 100 + (-200) < 0
    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBeTrue();

    component.cashToAdd = -50; // 100 + (-50) = 50 > 0
    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBeFalse();
  });

  it('should call userService.putUser on addCash with valid input', fakeAsync(() => {
    component.cashToAdd = 50;
    fixture.detectChanges();

    component.addCash();
    tick();

    expect(userServiceMock.putUser).toHaveBeenCalledWith(
      jasmine.objectContaining({
        cash: 150,
        username: 'testuser',
      }),
    );
    expect(component.cashToAdd).toBe(50); // cashToAdd bleibt gleich, kein Reset im Code
  }));

  it('should catch errors when putUser fails', fakeAsync(() => {
    userServiceMock.putUser.and.returnValue(Promise.reject('error'));
    component.cashToAdd = 10;

    spyOn(console, 'error');

    component.addCash();
    tick();

    expect(console.error).toHaveBeenCalledWith(
      'Fehler beim Aktualisieren des Geldes:',
      'error',
    );
  }));

  it('should toggle isSetLogin and isSetRegister correctly', () => {
    component.isSetLogin = false;
    component.isSetRegister = false;

    component.isSetRegister = true;
    expect(component.isSetRegister).toBeTrue();

    component.isSetLogin = true;
    component.isSetRegister = false;
    expect(component.isSetLogin).toBeTrue();
    expect(component.isSetRegister).toBeFalse();
  });

  it('should call authService.logout on logout button click', () => {
    fixture.detectChanges();
    const logoutButton = fixture.debugElement
      .queryAll(By.css('button'))
      ?.find((btn) => btn.nativeElement.textContent.includes('Logout'));
    expect(logoutButton).toBeTruthy();
    logoutButton?.nativeElement.click();

    expect(authServiceMock.logout).toHaveBeenCalled();
  });

  it('should close header when clicking outside', () => {
    headerServiceMock.isAccountHeaderExpanded = true;

    const event = new Event('click');
    Object.defineProperty(event, 'target', {
      value: document.createElement('div'),
    });

    component.handleOutsideClick(event);
    expect(headerServiceMock.isAccountHeaderExpanded).toBeFalse();
  });

  it('should not close header when clicking inside', () => {
    headerServiceMock.isAccountHeaderExpanded = true;
    const nativeElement =
      fixture.componentRef.injector.get(ElementRef).nativeElement;
    const event = new Event('click');
    Object.defineProperty(event, 'target', { value: nativeElement });

    component.handleOutsideClick(event);
    expect(headerServiceMock.isAccountHeaderExpanded).toBeTrue();
  });
});
