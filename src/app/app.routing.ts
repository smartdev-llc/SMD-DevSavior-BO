import { Routes, RouterModule } from '@angular/router';

import { OBJECT_COMPONENTS } from './components';
import { AuthGuard } from './guards';

const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: OBJECT_COMPONENTS.DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: OBJECT_COMPONENTS.HomeComponent},
    ],
    // canActivate: [AuthGuard]
  },
  { path: 'login', component: OBJECT_COMPONENTS.LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
