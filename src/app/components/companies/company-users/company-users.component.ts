import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../directives'
import map from 'lodash/map';
import { Router } from '@angular/router';


@Component({
  selector: 'company-users',
  templateUrl: 'company-users.component.html',
  styleUrls: ['company-users.component.scss']
})

export class CompanyUsersComponent implements OnInit {
  public users: Array<any> = [];
  public totalUsers: Number = 0;
  public usersQueryParams = {
    qs: '',
    size: 15,
    page: 0
  }

  @ViewChild('confirmCompanyStatusDialog') confirmCompanyStatusDialog : ConfirmDialogComponent ;

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.getListUsers();
  }

  getListUsers() {
    const params = new HttpParams()
      .set('qs', this.usersQueryParams.qs)
      .set('size', this.usersQueryParams.size.toString())
      .set('page', this.usersQueryParams.page.toString());
    this.userService.searchCompanyUsers(params).subscribe(
      data => {
        this.users = data.list;
        this.totalUsers = data.total;
      },
      error => {
      }
    );
  }

  pageChanged(event: any): void {
    this.usersQueryParams = {
      ...this.usersQueryParams,
      page: event.page - 1
    };
    this.getListUsers();
  }

  changeUserStatus(status: string, companyId: number) {
    this.confirmCompanyStatusDialog.openModal({status, companyId});
  }

  handleConfirm(isConfirm: any) {
    if (isConfirm) {
      const {companyId , status} = isConfirm;
      this.userService.updateCompanyUserStatus(companyId, status).subscribe(
        data => {
          map(this.users, (item) => {
            if(item.id === companyId) {
              item.status = data.status;
              return item
            }
          });
          this.toastr.success(`The company id is ${companyId} was updated successfully.`, 'Update Company');
        },
        error => {
          this.toastr.error('Update Failed!', 'Update Company');
        }
      );
    }
  }
  linkToCompanyDetail(companyId) {
    this.router.navigate([`/dashboard/company-users/${companyId}`]);
  }
}
