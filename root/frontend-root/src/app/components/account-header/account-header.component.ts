import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-account-header',
  standalone: true,
  imports: [MatButton, RouterLink, LoginComponent, RegisterComponent],
  templateUrl: './account-header.component.html',
  styleUrl: './account-header.component.scss',
})
export class AccountHeaderComponent {
  isSetRegister = false;
  isSetLogin = false;

  constructor(
    public userService: UserService,
    public authService: AuthService,
  ) {}
}
