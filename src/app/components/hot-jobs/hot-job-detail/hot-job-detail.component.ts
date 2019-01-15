import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import map from 'lodash/map';
import { ConfirmDialogComponent } from '../../../directives';
import { JobsService } from '../../../services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hot-job-detail',
  templateUrl: 'hot-job-detail.component.html',
  styleUrls: ['hot-job-detail.component.scss']
})
export class HotJobDetailComponent implements OnInit {
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
    this.jobsService.getHotJobDetail(jobId).subscribe(
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
      this.jobsService.updateHotJobStatus(jobId, status).subscribe(
        data => {
          this.toastr.success(`The job was updated successfully.`, 'Update Job');
          this.jobDetail.status = data.status
        },
        error => {
          this.toastr.error('Update Failed!', 'Update Job');
        }
      );
    }
  }

}
