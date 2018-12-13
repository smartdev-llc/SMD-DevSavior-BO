import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  searchUsers(params: HttpParams) {
    return this.http.get('/students/search', { params })
    .pipe(
      map((response: any) => response)
    );
  }
}
