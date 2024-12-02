import { Component } from '@angular/core';
import { ArticleListComponent } from '../article-list/article-list.component';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuctionListComponent } from '../auction-list/auction-list.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ArticleListComponent,
    MatButton,
    RouterLink,
    RouterOutlet,
    AuctionListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
