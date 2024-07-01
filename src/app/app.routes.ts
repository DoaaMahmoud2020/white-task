import { Routes } from '@angular/router';
import { postRoutes } from '@modules/post/post.routes';
import { dashboardRoutes } from '@modules/dashboard/dashboard.routes';
import { teamRoutes } from './modules/team/team.routes';
import { budgetRoutes } from './modules/budget/budget.routes';

export const routes: Routes = [
  ...postRoutes,
  ...dashboardRoutes,
  ...teamRoutes,
  ...budgetRoutes,
];
