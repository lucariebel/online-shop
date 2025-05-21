import { AuctionArticle } from './AuctionArticle';
import { DirectBuyArticle } from './DirectBuyArticle';

export interface User {
  userId: number;
  username: string;
  password: string;
  cash: number;
  participatedAuctionIds: number[];
  authToken?: string;
}
