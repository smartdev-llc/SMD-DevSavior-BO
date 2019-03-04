import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import map from 'lodash/map';
import { ConfirmDialogComponent } from '../../../directives';
import { JobsService } from '../../../services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'company-detail',
  templateUrl: 'company-detail.component.html',
  styleUrls: ['company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  @ViewChild('confirmJobStatusDialog') confirmJobStatusDialog: ConfirmDialogComponent;

  jobDetail: any = {};

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getListJobs();
  }

  getListJobs() {
    const jobId = this.route.snapshot.paramMap.get('id');
    this.jobsService.getJobDetail(jobId).subscribe(
      data => {
        this.jobDetail = data;
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

}
