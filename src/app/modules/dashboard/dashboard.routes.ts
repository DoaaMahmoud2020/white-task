import { Routes } from '@angular/router';
export const dashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent() {
          return import('./components/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          );
        },
      },
    ],
  },
];
