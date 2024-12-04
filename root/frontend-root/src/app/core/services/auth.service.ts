import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../envorinments/environment.development';
import { User } from '../interfaces/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = `${environment.apiUrl}/auth`;

  private tokenSubject = new BehaviorSubject<string | null>(null);

  private authToken: string = '';

  constructor(
    private http: HttpClient,
    public userService: UserService,
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
          this.authToken = response.token;
          this.tokenSubject.next(response.token);
          this.userService.user = response.user;
          console.log(this.userService.user);
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
          this.authToken = response.token;
          this.tokenSubject.next(response.token as string);
          this.userService.user = response.user;
          console.log(this.userService.user);
        },
      });
  }

  getToken() {
    return this.authToken;
  }

  isLoggedIn() {
    return !!this.authToken;
  }

  logout() {
    this.authToken = '';
    this.tokenSubject.next(null);
  }
}
