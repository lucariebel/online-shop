import { Article } from './Article';
import { User } from './User';

export interface DirectBuyArticle extends Article {
  price: number;
  isAvailable: boolean;
  buyerId?: number;
  buyer?: User;
}
