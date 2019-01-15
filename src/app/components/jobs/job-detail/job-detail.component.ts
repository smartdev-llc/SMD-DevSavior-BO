﻿import { Component, OnInit, ViewChild } from '@angular/core';
import map from 'lodash/map';
import { ConfirmDialogComponent } from '../../../directives';
import { JobsService } from '../../../services';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
          this.jobDetail.status = status
        },
        error => {
        }
      );
    }
  }

}
