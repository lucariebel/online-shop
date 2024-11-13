import { Article } from './Article';

export interface AuctionArticle extends Article {
  winnerId: number;
  endDate: Date;
  bid: number;
}
