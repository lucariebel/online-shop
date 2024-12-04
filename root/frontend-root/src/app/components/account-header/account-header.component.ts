import { Component, ElementRef, HostListener } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-account-header',
  standalone: true,
  imports: [MatButton, RouterLink, LoginComponent, RegisterComponent],
  templateUrl: './account-header.component.html',
  styleUrl: './account-header.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-out', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class AccountHeaderComponent {
  isSetRegister = false;
  isSetLogin = false;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public headerService: HeaderService,
    private eRef: ElementRef,
  ) {}

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (
      this.headerService.isAccountHeaderExpanded &&
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.headerService.isAccountHeaderExpanded = false;
    }
  }
}
