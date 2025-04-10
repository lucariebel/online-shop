import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from '../../../envorinments/environment.development';
import { Observable } from 'rxjs';
import { DirectBuyArticle } from '../interfaces/DirectBuyArticle';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchUrl = environment.apiUrl + '/search';
  public articleSearchString: string = '';
  public articles: DirectBuyArticle[] = [];
  constructor(private http: HttpClient) {}

  public searchArticle(searchString: string) {
    return this.http.get(this.searchUrl + '/article?search=' + searchString);
  }
}
