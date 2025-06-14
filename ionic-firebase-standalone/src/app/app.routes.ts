import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full',
  },
  {
    path: 'login-page',
    loadComponent: () => import('./auth/ui/pages/login-page/login-page.page').then( m => m.LoginPagePage)
  },
  {
    path: 'register-page',
    loadComponent: () => import('./auth/ui/pages/register-page/register-page.page').then( m => m.RegisterPagePage)

  },
  {
    path: 'forget-password',
    loadComponent: () => import('./auth/ui/pages/forget-password/forget-password.page').then( m => m.ForgetPasswordPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./shared/pages/tabs/tabs.page').then( m => m.TabsPage),
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: '',
    loadChildren: () =>
      import('./shared/pages/tabs/app.routes').then((m) => m.routes),
    canActivate: [() => inject(AuthGuard).canActivate()],
  },


];
