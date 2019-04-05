import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { UserService } from '../../services/user.service'
import { forEach } from '@angular/router/src/utils/collection';
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    }
  };
  public pieChartLabelsUser: Label[] = ['Active','Inactive'];
  public pieChartLabelsCompanies: Label[] = ['Active', 'Inactive', 'Pending', 'Rejected'];
  public pieChartDataUsers: number[] = [] ;
  public pieChartDataCompanies: number[] = [] ;
  public pieChartDataJobs:  number[] = [800,20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['#33b35a', '#ffce56','#f56954','#3c8dbc'],
    },
  ];
  studentsActive: any;
  companiesActive: any;
  studentsInactive: any

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.countStudents()
    this.countCompanies('ACTIVE')
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  countStudents(){
    this.userService.countStudentsByStatus(status).subscribe(
      data => {
        this.pieChartDataUsers.push(data.total)
        this.pieChartDataUsers.push(3)
      }
    )
  }

  countCompanies(status){
    this.userService.countCompaniesByStatus(status).subscribe(
      data => {
        this.pieChartDataCompanies.push(data.total)
        this.pieChartDataCompanies.push(3)
      }
    )
  }

}
