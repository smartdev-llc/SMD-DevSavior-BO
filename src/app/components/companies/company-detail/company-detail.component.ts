import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../../directives';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from  '../../../models/user';
import { City } from '../../../models/city.enum';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'company-detail',
  templateUrl: 'company-detail.component.html',
  styleUrls: ['company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit  {
  @ViewChild('confirmCompanyStatusDialog') confirmCompanyStatusDialog : ConfirmDialogComponent ;
  @ViewChild("inputFile")
  inputFile: ElementRef;
  companyDetail: any = {};
  public files: any[];
  public logoUploadURL : string;
  public coverUploadURL : string;
  public coverBtn =  'Change Cover';
  public logoBtn = 'Change Logo';
  public updateProfileForm: FormGroup;
  public companyId = this.route.snapshot.paramMap.get('id');
  public companySlug = this.route.snapshot.paramMap.get('slug');
  private PHONE_NUMBER_PATTERN = '^[0-9\+]{1,}[0-9\-]{3,15}$';
  private WEBSITE_PATTERN = '^(http(s)?:\/\/)[\\w\\.\\-]+(\\.[\\w\.\\-]+)+[\\w\\-\\.\_\~\:\/?#\\[\\]\@\!\$\&\'\(\)\*\\+\,\;\=\\.]+$';
  public cities = [
    {key: 'DN', value: City.DN},
    {key: 'HCM', value: City.HMC},
    {key: 'HN', value: City.HN},
    {key: 'OTHER', value: City.OTHER}
  ];
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],
      ['blockquote'],

      ['link']
    ]
  };
  public loadding = true;
  public isLoading = true;
  public submitted = false;
  constructor(
    private usersService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder : FormBuilder,
    private http: HttpClient
  ) {
    this.initUpdateProfileForm();
    this.files = []; 
   }

  ngOnInit() {
   this.getInformationCompany();
   
  //  this.logoUploadURL = `/companies/${this.companyDetail.id}/logo`;
  //  this.coverUploadURL = `/companies/${this.companyDetail.id}/cover`;

   this.logoUploadURL = `/companies/${this.companyId}/logo`;
   this.coverUploadURL = `/companies/${this.companyId}/cover`;

  }
  
  getInformationCompany() {
    this.usersService.getInformationCompany(this.companySlug).subscribe(
      data => {
        this.companyDetail = data;
        // this.logoUploadURL = `/companies/${this.companyDetail.id}/logo`;
        // this.coverUploadURL = `/companies/${this.companyDetail.id}/cover`;
        
        this.isLoading = false;
        if (this.companyDetail.logoURL!='') {
          this.companyDetail.logoURL = this.fixUrl(this.companyDetail.logoURL);
        }
        if (this.companyDetail.coverURL!='') {        
          this.companyDetail.coverURL = this.fixUrl(this.companyDetail.coverURL);
        }
        this.updateDataIntoForm(this.companyDetail);
        this.loadding = false;
      },
      error => {
      }
    );
  }

  get f() {
    return this.updateProfileForm.controls;
  }

  changeImage(value) {
    this.companyDetail.logoURL = this.fixUrl(value);
  }
  changeImageCoverURL(value) {
    this.companyDetail.coverURL = this.fixUrl(value);
  }

  setLoading(value) {
    this.loadding = value;
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

 
  updateDataIntoForm(company: Company) {
    this.updateProfileForm.setValue({
      name: company.name,
      address: company.address,
      city: company.city,
      phoneNumber: company.phoneNumber,
      contactName: company.contactName,
      website: company.website,
      description: company.description,
    });
  }
  

  initUpdateProfileForm() {
    this.updateProfileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.PHONE_NUMBER_PATTERN)]],
      website: ['', [Validators.required,Validators.pattern(this.WEBSITE_PATTERN)]],
      description: ['', [Validators.required]]
    });
  }

  updateProfile() {
    this.isLoading = true;
    this.submitted = true;
    if(this.updateProfileForm.invalid) {
      this.isLoading = false;
      return;
    }
    this.usersService.updateInformationCompany(this.updateProfileForm.value, this.companyDetail.id)
                        .subscribe(data => {
                          this.isLoading = false;
                          this.toastr.success(`The company was updated successfully.`, 'Update company');
                          this.companyDetail = data;

                          this.getInformationCompany()
                      },
                      error => {
                            throw error;
                      })
  }
  private fixUrl(url: string) {
    if (url && url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
      return url;
    } else {
      return environment.apiEndpoint + url;
    }
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    }
  };
  public pieChartLabels: Label[] = ['All', 'Current'];
  public pieChartData: number[] = [800, 300];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
