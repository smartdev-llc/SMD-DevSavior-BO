import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import map from 'lodash/map';
import { ConfirmDialogComponent } from '../../../directives';
import { JobsService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'job-detail',
  templateUrl: 'job-detail.component.html',
  styleUrls: ['job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  @ViewChild('confirmJobStatusDialog') confirmJobStatusDialog: ConfirmDialogComponent;

  jobDetail: any = {};

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    const jobId = this.route.snapshot.paramMap.get('id');
    this.jobsService.getJobDetail(jobId).subscribe(
      data => {
        this.jobDetail = data;
        this.jobDetail.company.logoURL = this.fixUrl(this.jobDetail.company.logoURL);
      },
      error => {
      }
    );
  }

  changeJobStatus(status: string, jobId: number) {
    this.confirmJobStatusDialog.openModal({status, jobId});
  }

  handleConfirm(isConfirm: any) {
    if (isConfirm) {
      const { jobId, status } = isConfirm;
      this.jobsService.updateJobStatus(jobId, status).subscribe(
        data => {
          this.jobDetail.status = data.status;
          this.toastr.success(`The job was updated successfully.`, 'Update Job');
        },
        error => {
          this.toastr.error('Update Failed!', 'Update Job');
        }
      );
    }
  }

  private fixUrl(url: string) {
    if (url && url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
      return url;
    } else {
      return environment.apiEndpoint + url;
    }
  }
}
