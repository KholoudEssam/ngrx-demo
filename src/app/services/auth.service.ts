import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BEUrl = `${environment.apiUrl}/api/users`;

  user: User;

  constructor(private http: HttpClient) {}

  signup(data: User) {
    return this.http.post(`${this.BEUrl}/signup`, data);
  }

  login(email: string, password: string) {
    const url = `${this.BEUrl}/login`;
    const data: Partial<User> = { email, password };
    return this.http.post<{ token: string; userId: string }>(url, data).pipe(
      tap((data) => {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
      }),
      catchError(() => {
        (err) => console.log(err);
        return EMPTY;
      })
    );
  }
}
