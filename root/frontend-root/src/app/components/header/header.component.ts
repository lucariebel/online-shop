import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AccountHeaderComponent } from '../account-header/account-header.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { HeaderService } from '../../core/services/header.service';
import { SearchService } from '../../core/services/search.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { firstValueFrom } from 'rxjs';
import { DirectBuyArticle } from '../../core/interfaces/DirectBuyArticle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButton,
    AccountHeaderComponent,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  articleSearchForm: FormGroup;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public headerService: HeaderService,
    public searchService: SearchService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.articleSearchForm = this.fb.group({
      searchString: '',
    });
  }

  toggleWindow(event: Event) {
    this.headerService.isAccountHeaderExpanded =
      !this.headerService.isAccountHeaderExpanded;
    event.stopPropagation();
  }

  submitArticleSearch() {
    console.log(this.articleSearchForm.value.searchString);
    this.searchService.articleSearchString =
      this.articleSearchForm.value.searchString;
    this.router.navigateByUrl('search');
    firstValueFrom(
      this.searchService.searchArticle(this.searchService.articleSearchString),
    ).then((data) => {
      console.log(data as DirectBuyArticle[]);
      this.searchService.articles = data as DirectBuyArticle[];
    });
  }
}
