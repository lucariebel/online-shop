import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../envorinments/environment.development';
import { firstValueFrom } from 'rxjs';
import { DirectBuyArticle } from '../interfaces/DirectBuyArticle';
import { Article } from '../interfaces/Article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  url: string = environment.apiUrl + '/article';
  directBuyArticles: DirectBuyArticle[] = []; // Dieses Array wird zwischengespeichert

  constructor(private http: HttpClient) {}

  // Methode zum Laden der Artikel (mit Caching)
  async loadDirectBuyArticles(): Promise<void> {
    if (this.directBuyArticles.length === 0) {
      // Vermeide wiederholte Requests
      try {
        this.directBuyArticles = await firstValueFrom(
          this.http.get<DirectBuyArticle[]>(this.url), // Achte auf <DirectBuyArticle[]>
        ); // Speichere die Daten im Service
      } catch (error) {
        console.error('Fehler beim Laden der Artikel:', error);
        throw error; // Weiterwerfen, um in der Komponente zu handhaben
      }
    }
  }

  async getArticles(): Promise<any> {
    try {
      const data: DirectBuyArticle = await firstValueFrom(
        this.http.get<DirectBuyArticle>(this.url),
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getRandomArticles(count: number): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.http.get<DirectBuyArticle>(`${this.url}/random?count=${count}`),
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async postArticle(article: Article): Promise<any> {
    try {
      const data: DirectBuyArticle = await firstValueFrom(
        this.http.post<DirectBuyArticle>(this.url, article),
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
