import { Routes, RouterModule } from '@angular/router';

import { OBJECT_COMPONENTS } from './components';
import { AuthGuard, LoggedGuard } from './guards';

const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: OBJECT_COMPONENTS.DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: OBJECT_COMPONENTS.HomeComponent},
      { path: 'student-users', component: OBJECT_COMPONENTS.StudentUsersComponent},
      { path: 'company-users', component: OBJECT_COMPONENTS.CompanyUsersComponent},
      { path: 'company-users/:slug/:id', component: OBJECT_COMPONENTS.CompanyDetailComponent},
      { path: 'jobs', component: OBJECT_COMPONENTS.ListJobsComponent},
      { path: 'jobs/:id', component: OBJECT_COMPONENTS.JobDetailComponent },
      { path: 'hot-jobs', component: OBJECT_COMPONENTS.ListHotJobsComponent},
      { path: 'hot-jobs/:id', component: OBJECT_COMPONENTS.HotJobDetailComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: 'login', component: OBJECT_COMPONENTS.LoginComponent, canActivate: [LoggedGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
