import { Routes } from '@angular/router';
export const teamRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'team',
        loadComponent() {
          return import('./components/team/team.component').then(
            (c) => c.TeamComponent
          );
        },
      },
    ],
  },
];
