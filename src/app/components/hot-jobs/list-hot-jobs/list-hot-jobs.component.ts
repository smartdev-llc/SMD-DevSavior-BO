import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import map from 'lodash/map';
import { ConfirmDialogComponent } from '../../../directives';
import { JobsService } from '../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'list-hot-jobs',
  templateUrl: 'list-hot-jobs.component.html',
  styleUrls: ['list-hot-jobs.component.scss']
})
export class ListHotJobsComponent implements OnInit {
  @ViewChild('confirmJobStatusDialog') confirmJobStatusDialog: ConfirmDialogComponent;

  public hotJobs: Array<any> = [];
  public totalJobs: Number = 0;
  public jobsQueryParams = {
    qs: '',
    size: 15,
    page: 0
  }

  constructor(
    private jobsService: JobsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getListJobs();
  }

  getListJobs() {
    const params = new HttpParams()
      .set('qs', this.jobsQueryParams.qs)
      .set('size', this.jobsQueryParams.size.toString())
      .set('page', this.jobsQueryParams.page.toString());
    this.jobsService.getHotJobs(params).subscribe(
      data => {
        this.hotJobs = data.list;
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
      this.jobsService.updateHotJobStatus(jobId, status).subscribe(
        data => {
          map(this.hotJobs, (item) => {
            if(item.id === jobId) {
              item.status = data.status;
              return item;
            }
          });
          this.toastr.success(`The job id is ${jobId} was updated successfully.`, 'Update Job');
        },
        error => {
          this.toastr.error('Update Failed!', 'Update Job');
        }
      );
    }
  }

  linkToJobDetail(id: any) {
    this.router.navigate([`/dashboard/hot-jobs/${id}`]);
  }

}
