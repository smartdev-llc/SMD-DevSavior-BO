import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable()
export class JobsService {
  constructor(private http: HttpClient) { }

  getJobs(params: HttpParams) {
    return this.http.get('/jobs', { params })
      .pipe(
        map((response: any) => response)
      );
  }

  updateJobStatus(jobId, status) {
    const params = { value: status  };
    return this.http.post<any>(`/jobs/${jobId}/status`, params)
      .pipe(
        map((response: any) => response)
      );
  }
}
