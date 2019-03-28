import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services';
import { HttpParams } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../directives'
import { ToastrService } from 'ngx-toastr';
import { map } from 'lodash/map'
@Component({
  selector: 'student-users.',
  templateUrl: 'student-users.component.html',
  styleUrls: ['student-users.component.scss']
})
export class StudentUsersComponent implements OnInit {
  @ViewChild('confirmUserStatusDialog') confirmUserStatusDialog : ConfirmDialogComponent ;
  @ViewChild('confirmDeleteUserDialog') confirmDeleteUserDialog : ConfirmDialogComponent ;

  public users: Array<any> = [];
  public totalUsers: Number = 0;
  public usersQueryParams = {
    qs: '',
    size: 15,
    page: 0
  }

  constructor(private userService: UserService,
              private toastr :ToastrService) { }

  ngOnInit() {
    this.getListUsers();
  }

  getListUsers() {
    const params = new HttpParams()
      .set('qs', this.usersQueryParams.qs)
      .set('size', this.usersQueryParams.size.toString())
      .set('page', this.usersQueryParams.page.toString());
    this.userService.searchStudentUsers(params).subscribe(
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

  delete(id) {
    this.confirmDeleteUserDialog.openModal({id});
  }

  handleConfirmDel(isConfirm: any) {
    if (isConfirm) {
      const id = isConfirm;
      this.userService.deleteStudent(id.id).subscribe(
        data =>{
          this.getListUsers(); 
          this.toastr.success(`The Student id is ${id.id} was deleted successfully.`, 'Deleted Student');
        }
      );
    } else {
      this.toastr.error('Deleted Failed!', 'Deleted Student');
    }
  }

  changeUserStatus(status: string, userId: number) {
    this.confirmUserStatusDialog.openModal({status, userId});
  }

  handleConfirmChange(isConfirm: any) {
    if (isConfirm) {
      const {userId , status} = isConfirm;
      this.userService.updateStudentUserStatus(userId, status).subscribe(
        data => {
          this.getListUsers(); 
          this.toastr.success(`The student user id is ${userId} was updated successfully.`, 'Update student user');
        },
        error => {
          this.toastr.error('Update Failed!', 'Update student user');
        }
      );
    }
  }
}
