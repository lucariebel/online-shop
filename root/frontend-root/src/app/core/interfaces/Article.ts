import { User } from './User';

export interface Article {
  articleId: number;
  ownerId: number;
  owner: User;
  articleName: string;
  pictures: string[];
  description: string;
  category: string;
}
