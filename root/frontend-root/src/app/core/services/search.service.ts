import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from '../../../envorinments/environment.development';
import { Observable } from 'rxjs';
import { DirectBuyArticle } from '../interfaces/DirectBuyArticle';
import { AuctionArticle } from '../interfaces/AuctionArticle';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchUrl = environment.apiUrl + '/search';
  public articleSearchString: string = '';
  public auctionSearchString: string = '';
  public articles: DirectBuyArticle[] = [];
  public auctions: AuctionArticle[] = [];
  constructor(private http: HttpClient) {}

  public searchArticle(searchString: string) {
    return this.http.get(this.searchUrl + '/article?search=' + searchString);
  }

  public searchAuction(searchString: string) {
    return this.http.get(this.searchUrl + '/auction?search=' + searchString);
  }
}
