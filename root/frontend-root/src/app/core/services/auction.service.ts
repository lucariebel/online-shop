import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../envorinments/environment.development';
import { AuctionArticle } from '../interfaces/AuctionArticle';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  url: string = environment.apiUrl + '/auction';

  auctionArticles: AuctionArticle[] = [];

  constructor(private http: HttpClient) {}

  // Methode zum Laden der Auktionen (mit Caching)
  async loadAuctionArticles(): Promise<void> {
    if (this.auctionArticles.length === 0) {
      // Vermeide wiederholte Requests
      try {
        this.auctionArticles = await firstValueFrom(
          this.http.get<AuctionArticle[]>(this.url), // Achte auf <AuctionArticle[]>
        ); // Speichere die Daten im Service
      } catch (error) {
        console.error('Fehler beim Laden der Auktionen:', error);
        throw error; // Weiterwerfen, um in der Komponente zu handhaben
      }
    }
  }

  async getAuctions(): Promise<any> {
    try {
      const data: AuctionArticle = await firstValueFrom(
        this.http.get<AuctionArticle>(this.url),
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getRandomAuctions(count: number): Promise<any> {
    try {
      const data: AuctionArticle = await firstValueFrom(
        this.http.get<AuctionArticle>(`${this.url}/random?count=${count}`),
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async postAuction(auction: AuctionArticle): Promise<any> {
    try {
      const data: AuctionArticle = await firstValueFrom(
        this.http.post<AuctionArticle>(this.url, auction),
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async putAuction(auction: AuctionArticle): Promise<any> {
    try {
      const data: AuctionArticle = await firstValueFrom(
        this.http.put<AuctionArticle>(
          `${this.url}/${auction.articleId}`,
          auction,
        ),
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
