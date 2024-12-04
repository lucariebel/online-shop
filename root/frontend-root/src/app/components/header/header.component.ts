import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AccountHeaderComponent } from '../account-header/account-header.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButton, AccountHeaderComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAccountHeaderExpanded = false;

  constructor(
    public authService: AuthService,
    public userService: UserService,
  ) {}
}
