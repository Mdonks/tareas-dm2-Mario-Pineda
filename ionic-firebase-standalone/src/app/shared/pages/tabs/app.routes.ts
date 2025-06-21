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
          import('../../../profile/pages/profile/profile.page').then(
            (m) => m.ProfilePage
          ),
      },
      {
        path: 'galleries',
        loadComponent: () =>
          import('../../../galleries/pages/galleries/galleries.page').then(
            (m) => m.GalleriesPage
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../../../home/pages/home.page').then((m) => m.HomePage),
      },
      {
        path: '**',
        redirectTo:'tabs/home',
        pathMatch: 'full'
      }
    ],
  },
];