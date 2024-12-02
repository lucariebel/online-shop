import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../envorinments/environment.development';
import { User } from '../interfaces/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = `${environment.apiUrl}/auth`;

  private tokenSubject = new BehaviorSubject<string | null>(null);

  user: User = {} as User;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(username: string, password: string) {
    return this.http
      .post<{
        token: string;
        user: User;
      }>(`${this.authUrl}/register`, {
        username: username,
        password: password,
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          this.tokenSubject.next(response.token);
          this.user = response.user;
          console.log(this.user);
        },
      });
  }

  login(username: string, password: string) {
    return this.http
      .post<{ token: string; user: User }>(`${this.authUrl}/login`, {
        username,
        password,
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token as string);
          this.tokenSubject.next(response.token as string);
          this.user = response.user;
          this.router.navigate(['/']);
        },
      });
  }

  getToken() {
    console.log(localStorage.getItem('authToken'));
    return this.tokenSubject.asObservable();
  }

  isLoggedIn() {
    return !!localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
  }
}
