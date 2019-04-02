import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import map from 'lodash/map';
import { ConfirmDialogComponent } from '../../../directives';
import { JobsService } from '../../../services';
import { Router } from '@angular/router';

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
  };
  timeNow = Date.now();

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
    this.jobsService.getJobs(params).subscribe(
      data => {
        this.jobs = data.list;
        this.totalJobs = data.total;
      },
      error => {
      }
    );
  }

  getSearchJobs() {
    const params = new HttpParams()
      .set('qs', this.jobsQueryParams.qs)
      .set('size', this.jobsQueryParams.size.toString())
      .set('page', this.jobsQueryParams.page.toString());
    this.jobsService.searchJobs(params).subscribe(
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
      this.jobsService.updateJobStatus(jobId, status).subscribe(
        data => {
          map(this.jobs, (item) => {
            if(item.id === jobId) {
              item.status = data.status;
              return item
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
    this.router.navigate([`/dashboard/jobs/${id}`]);
  }

  updateExpired(jobId: number){
    this.jobsService.updateExpired(jobId).subscribe(
      data=>{
        this.toastr.success(`The job id is ${jobId} was updated successfully.`, 'Update Job');
      },
      error=>{
        this.toastr.error('Update Failed!', 'Update Job');
      });
    this.ngOnInit();
  }

  sendJobNoty(){
    this.jobsService.sendJobNotificationManually().subscribe(
      data=>{
        this.toastr.success('Send job notification for candidate successfully.', 'Send Job Notification');
      },
      error=>{
        this.toastr.error('Send job notification for candidate Failed!', 'Send Job Notification');
      });
  }
}
