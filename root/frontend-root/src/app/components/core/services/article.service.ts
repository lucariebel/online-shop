import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../envorinments/environment.development';
import { firstValueFrom } from 'rxjs';
import { DirectBuyArticle } from '../interfaces/DirectBuyArticle';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  url: string = environment.apiUrl + '/article';

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
