import { Router, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('../../../profile/profile.page').then(
            (m) => m.ProfilePage
          ),
      },
      {
        path: 'galleries',
        loadComponent: () =>
          import('../../../galleries/galleries.page').then(
            (m) => m.GalleriesPage
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../../../home/home.page').then((m) => m.HomePage),
      },
      {
        path: '**',
        redirectTo:'tabs/home',
        pathMatch: 'full'
      }
    ],
  },
];