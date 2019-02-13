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

  updateJobStatus(jobId, status, params = {}) {
    return this.http.put<any>(`/jobs/${jobId}/${status}`, params)
      .pipe(
        map((response: any) => response)
      );
  }
  
  updateExpired(jobId) {
    return this.http.put('/jobs/'+jobId+'/renew','')
      .pipe(
        map((response: any) => response)
      );
  }

  getHotJobs(params: HttpParams) {
    return this.http.get('/bo/hotjobs', { params })
      .pipe(
        map((response: any) => response)
      );
  }

  updateHotJobStatus(jobId, status, params = {}) {
    return this.http.put<any>(`/hotjobs/${jobId}/${status}`, params)
      .pipe(
        map((response: any) => response)
      );
  }

  getJobDetail(jobId) {
    return this.http.get(`/jobs/${jobId}`)
      .pipe(
        map((response: any) => response)
      );
  }

  getHotJobDetail(jobId) {
    return this.http.get(`/hotjobs/${jobId}`)
      .pipe(
        map((response: any) => response)
      );
  }

  sendJobNotificationManually(){
    return this.http.post('/jobs/alert-queues','')
    .pipe(
      map((response: any) => response)
    );
  }
}
