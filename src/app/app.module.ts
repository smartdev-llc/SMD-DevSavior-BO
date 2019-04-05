import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ChartsModule } from 'ng2-charts';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AlertComponent, ConfirmDialogComponent, UploadfileComponent } from './directives';
import { ParseSkill, SalaryConverterPipe, PhotoURLConverterPipe, KeyValuePipe } from './pipes';
import { AuthGuard, LoggedGuard } from './guards';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { ALL_SERVICES } from './services';
import { ALL_COMPONENTS } from './components';
import { PaginationModule } from 'ngx-bootstrap/pagination'

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    QuillModule,
    ChartsModule,
    FileUploadModule,
    LoadingBarRouterModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    ConfirmDialogComponent,
    UploadfileComponent,
    ParseSkill,
    KeyValuePipe,
    SalaryConverterPipe,
    PhotoURLConverterPipe,
    ...ALL_COMPONENTS
  ],
  providers: [
    AuthGuard,
    LoggedGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ...ALL_SERVICES
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
