import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Role } from '../models';
import { User } from 'src/app/models/user';

@Injectable()
export class AuthenticationService {
  static PREFIX_AUTHORIZATION = 'Bearer ';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const params = { email, password, role: Role.Admin };
    return this.http.post<any>('/auth/login', params)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    return this.http.post('/auth/logout', {})
      .pipe(
        map(res => {
          localStorage.removeItem('currentUser');
          return res
        })
      );
  }

  getCurrentUser(): User {
    try {
      return JSON.parse(localStorage.getItem('currentUser'));
    } catch (error) {
      return null;
    }
  }

  getTokenHeader(request: HttpRequest<any>): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': request.headers.get('Content-Type') || 'application/json',
      'Authorization': this.getAccessToken()
    });
  }

  getAccessToken() {
    const user: User = ['undefined', null]
    .indexOf(localStorage.getItem('currentUser')) === -1 ?
    JSON.parse(localStorage.getItem('currentUser')) : {};
    if (user !== undefined) {
      return AuthenticationService.PREFIX_AUTHORIZATION + user.token;
    }
    return '';
  }

  removeTokens(): void {
    localStorage.removeItem('currentUser');
  }
}
