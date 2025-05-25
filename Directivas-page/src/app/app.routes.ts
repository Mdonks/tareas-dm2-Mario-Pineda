import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'directives-page',
    loadComponent: () => import('./directives-page/directives-page.page').then( m => m.DirectivesPagePage)
  },  {
    path: 'register-page',
    loadComponent: () => import('./auth/register-page/register-page.page').then( m => m.RegisterPagePage)
  },

];
