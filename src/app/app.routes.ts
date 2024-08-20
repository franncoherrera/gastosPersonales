import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(
        (login) => login.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (register) => register.RegisterComponent
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (dashboard) => dashboard.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (dashboard) => dashboard.DashboardModule
      ),
    canActivate: [authGuard],
  },
];
