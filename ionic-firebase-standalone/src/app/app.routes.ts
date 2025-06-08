import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
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
  }

];
