import { AuctionArticle } from './AuctionArticle';

export interface User {
  userId: number;
  username: string;
  password: string;
  cash: number;
  auctions: AuctionArticle[];
  authToken?: string;
}
