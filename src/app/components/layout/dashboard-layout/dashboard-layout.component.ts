import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services';

@Component({
  templateUrl: './dashboard-layout.component.html',
  selector: 'dashboard-layout',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout()
      .subscribe(res => {
        this.router.navigate(['/login']);
      })
  }

}
