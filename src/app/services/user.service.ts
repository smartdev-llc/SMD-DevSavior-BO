import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { UpdateCompanyProfileRequest } from '../models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  searchStudentUsers(params: HttpParams) {
    return this.http.get('/students/search', { params })
    .pipe(
      map((response: any) => response)
    );
  }

  searchCompanyUsers(params: HttpParams) {
    return this.http.get('/companies/search', { params })
    .pipe(
      map((response: any) => response)
    );
  }

  updateCompanyUserStatus(companyId, status, params = {}) {
    return this.http.put<any>(`/companies/${companyId}/${status}`, params)
    .pipe(
      map((response: any) => response)
    );
  }

  getInformationCompany(companyId) {
    return this.http.get(`/companies/${companyId}`)
    .pipe(
      map((response: any) => response)
    );
  }

  updateInformationCompany(company: UpdateCompanyProfileRequest, companyId): Observable<any> {
    return this.http.put(`/companies/${companyId}/info`, company);
  }

  deleteStudent(userId) {
    return this.http.delete(`/students/${userId}`)
    .pipe(
      map((response: any) => response)
    );
  }

  updateStudentUserStatus(studentId, status, params = {}) {
    return this.http.put<any>(`/students/${studentId}/${status}`, params)
    .pipe(
      map((response: any) => response)
    );
  }
}
