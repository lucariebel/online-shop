import { Article } from './Article';

export interface AuctionArticle extends Article {
  endDate: Date;
  bid: number;
  IsEnded?: boolean;
}
