import { User } from './User';

export interface Article {
  articleId: number;
  userId: number;
  user: User;
  articleName: string;
  pictures: string[];
  description: string;
  category: string;
}
