import { Article } from './Article';

export interface AuctionArticle extends Article {
  endTime: string;
  endDate: Date;
  bid: number;
}
