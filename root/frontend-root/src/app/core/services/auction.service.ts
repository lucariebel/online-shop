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
}
