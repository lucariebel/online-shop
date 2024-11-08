import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../envorinments/environment.development';
import { firstValueFrom } from 'rxjs';
import { DirectBuyArticle } from '../interfaces/DirectBuyArticle';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  url: string = environment.apiUrl + '/article';

  directBuyArticles: DirectBuyArticle[] = [
    {
      articleId: 1,
      articleName:
        'converse chuck taylor batman DC supermen original ungetragen "vi',
      price: 12,
      userId: 1,
      pictures: ['https://i.ebayimg.com/images/g/S0cAAOSwxcFnKgTY/s-l500.jpg'],
      description: 'blabla',
      category: 'Schuh',
    },
    {
      articleId: 2,
      articleName: 'test2',
      price: 123,
      userId: 1,
      pictures: ['https://i.ebayimg.com/images/g/S0cAAOSwxcFnKgTY/s-l500.jpg'],
      description: 'blablofdfa',
      category: 'Schuh',
    },
    {
      articleId: 2,
      articleName: 'test2',
      price: 123,
      userId: 2,
      pictures: ['https://i.ebayimg.com/images/g/N-EAAOSwvQBly6XW/s-l500.jpg'],
      description: 'blablofdfa',
      category: 'Schuh',
    },
    {
      articleId: 2,
      articleName: 'test2',
      price: 123,
      userId: 1,
      pictures: ['https://i.ebayimg.com/images/g/S0cAAOSwxcFnKgTY/s-l500.jpg'],
      description: 'blablofdfa',
      category: 'Schuh',
    },
    {
      articleId: 2,
      articleName: 'test2',
      price: 123,
      userId: 2,
      pictures: ['https://i.ebayimg.com/images/g/N-EAAOSwvQBly6XW/s-l500.jpg'],
      description: 'blablofdfa',
      category: 'Schuh',
    },
    {
      articleId: 2,
      articleName: 'test2',
      price: 123,
      userId: 2,
      pictures: ['https://i.ebayimg.com/images/g/N-EAAOSwvQBly6XW/s-l500.jpg'],
      description: 'blablofdfa',
      category: 'Schuh',
    },
    {
      articleId: 2,
      articleName: 'test2',
      price: 123,
      userId: 1,
      pictures: ['https://i.ebayimg.com/images/g/S0cAAOSwxcFnKgTY/s-l500.jpg'],
      description: 'blablofdfa',
      category: 'Schuh',
    },
    {
      articleId: 2,
      articleName: 'test2',
      price: 123,
      userId: 2,
      pictures: ['https://i.ebayimg.com/images/g/N-EAAOSwvQBly6XW/s-l500.jpg'],
      description: 'blablofdfa',
      category: 'Schuh',
    },
    {
      articleId: 2,
      articleName: 'test2',
      price: 123,
      userId: 2,
      pictures: ['https://i.ebayimg.com/images/g/N-EAAOSwvQBly6XW/s-l500.jpg'],
      description: 'blablofdfa',
      category: 'Schuh',
    },
  ];

  constructor(private http: HttpClient) {}

  async getArticles(): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get<DirectBuyArticle>(this.url),
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
}
