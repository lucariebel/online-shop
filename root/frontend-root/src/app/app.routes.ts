import { Routes } from '@angular/router';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { HomeComponent } from './components/home/home.component';
import { CreateAuctionComponent } from './components/create-auction/create-auction.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ArticleSearchListComponent } from './components/article-search-list/article-search-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { AuctionDetailComponent } from './components/auction-detail/auction-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'create-article',
    component: CreateArticleComponent,
  },
  {
    path: 'create-auction',
    component: CreateAuctionComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'search',
    component: ArticleSearchListComponent,
  },
  {
    path: 'article/:id',
    component: ArticleDetailComponent,
  },
  {
    path: 'auction/:id',
    component: AuctionDetailComponent,
  },
];
