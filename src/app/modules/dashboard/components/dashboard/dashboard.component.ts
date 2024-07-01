import { Component } from '@angular/core';
import { IDashboardItem } from '../../models/dashoard-item.model';
import { STATISTICS } from '../../constants/dashoard-item.constant';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { DashboardStatisticsComponent } from './dashboard-statistics/dashboard-statistics.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardCardComponent, DashboardStatisticsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  statistics: IDashboardItem[] = STATISTICS;
}
