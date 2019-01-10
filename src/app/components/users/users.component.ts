import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: Array<any> = [];
  public totalUsers: Number = 0;
  public usersQueryParams = {
    qs: '',
    size: 15,
    page: 0
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getListUsers();
  }

  getListUsers() {
    const params = new HttpParams()
      .set('qs', this.usersQueryParams.qs)
      .set('size', this.usersQueryParams.size.toString())
      .set('page', this.usersQueryParams.page.toString());
    this.userService.searchUsers(params).subscribe(
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

}
