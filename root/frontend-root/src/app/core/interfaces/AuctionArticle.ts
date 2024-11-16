import { Article } from './Article';

export interface AuctionArticle extends Article {
  endDate: string;
  price: number;
}
