import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import map from 'lodash/map';
import { ConfirmDialogComponent } from '../../../directives';
import { JobsService } from '../../../services';

@Component({
  selector: 'list-jobs',
  templateUrl: 'list-jobs.component.html',
  styleUrls: ['list-jobs.component.scss']
})
export class ListJobsComponent implements OnInit {
  @ViewChild('confirmJobStatusDialog') confirmJobStatusDialog: ConfirmDialogComponent;

  public jobs: Array<any> = [];
  public totalJobs: Number = 0;
  public jobsQueryParams = {
    qs: '',
    size: 15,
    page: 0
  }

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
    this.getListJobs();
    // this.jobsService.updateJobStatus(1, "ACTIVE").subscribe(
    //   data => {
    //     console.log(data)
    //   },
    //   error => {
    //   }
    // );
  }

  getListJobs() {
    const params = new HttpParams()
      .set('qs', this.jobsQueryParams.qs)
      .set('size', this.jobsQueryParams.size.toString())
      .set('page', this.jobsQueryParams.page.toString());
    this.jobsService.getJobs(params).subscribe(
      data => {
        this.jobs = data.list;
        this.totalJobs = data.total;
      },
      error => {
      }
    );
  }

  pageChanged(event: any): void {
    this.jobsQueryParams = {
      ...this.jobsQueryParams,
      page: event.page - 1
    };
    this.getListJobs();
  }

  changeJobStatus(status: string, jobId: number) {
    this.confirmJobStatusDialog.openModal({status, jobId});
  }

  handleConfirm(isConfirm: any) {
    if (isConfirm) {
      const { jobId, status } = isConfirm;
      console.log(isConfirm)
      this.jobsService.updateJobStatus(jobId, status).subscribe(
        data => {
          map(this.jobs, (item) => {
            if(item.id === jobId) {
              item.status = status;
              return item
            }
          })
        },
        error => {
        }
      );
    }
  }

}
