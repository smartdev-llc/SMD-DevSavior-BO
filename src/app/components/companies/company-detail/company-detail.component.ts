import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import map from 'lodash/map';
import { ConfirmDialogComponent } from '../../../directives';
import { UserService } from '../../../services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'company-detail',
  templateUrl: 'company-detail.component.html',
  styleUrls: ['company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  @ViewChild('confirmCompanyStatusDialog') confirmCompanyStatusDialog : ConfirmDialogComponent ;


  companyDetail: any = {};

  constructor(
    private usersService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getListJobs();
  }

  getListJobs() {
    const companyId = this.route.snapshot.paramMap.get('id');
    this.usersService.getInformationCompany(companyId).subscribe(
      data => {
        this.companyDetail = data;
      },
      error => {
      }
    );
  }

  changeCompanyStatus(status: string, companyId: number) {
    this.confirmCompanyStatusDialog.openModal({status, companyId});
  }

  handleConfirm(isConfirm: any) {
    if (isConfirm) {
      const { companyId, status } = isConfirm;
      this.usersService.updateCompanyUserStatus(companyId, status).subscribe(
        data => {
          this.companyDetail.status = data.status;
          this.toastr.success(`The company was updated successfully.`, 'Update company');
        },
        error => {
          this.toastr.error('Update Failed!', 'Update company');
        }
      );
    }
  }

}
