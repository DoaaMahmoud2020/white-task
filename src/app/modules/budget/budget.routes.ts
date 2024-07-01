import { Routes } from '@angular/router';
export const budgetRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'budget',
        loadComponent() {
          return import('./components/budget/budget.component').then(
            (c) => c.BudgetComponent
          );
        },
      },
    ],
  },
];
