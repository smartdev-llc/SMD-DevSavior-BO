﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './directives';
import { AuthGuard, LoggedGuard } from './guards';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { ALL_SERVICES } from './services';
import { ALL_COMPONENTS } from './components';;
import { PaginationModule } from 'ngx-bootstrap/pagination'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    PaginationModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AlertComponent,
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
