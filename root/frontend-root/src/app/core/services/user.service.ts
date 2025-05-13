import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../envorinments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = {} as User;
  url: string = environment.apiUrl + '/User';

  constructor(private http: HttpClient) {}

  async putUser(user: User): Promise<any> {
    try {
      return await firstValueFrom(
        this.http.put<User>(`${this.url}/${user.userId}`, user),
      );
    } catch (error) {
      console.error(error);
    }
  }
}
