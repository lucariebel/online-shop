import { Routes } from '@angular/router';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { HomeComponent } from './components/home/home.component';
import { CreateAuctionComponent } from './components/create-auction/create-auction.component';

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
];
