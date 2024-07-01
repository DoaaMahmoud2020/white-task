import { Component } from '@angular/core';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { IDashboardItem } from '@app/modules/dashboard/models/dashoard-item.model';
import {
  SUMMARY_FOOTER_STATISTICS,
  SUMMARY_HEADER_STATISTICS,
} from '@app/modules/dashboard/constants/dashoard-item.constant';
import { DashboardChartsComponent } from '../dashboard-charts/dashboard-charts.component';

@Component({
  selector: 'app-dashboard-statistics',
  standalone: true,
  imports: [DashboardCardComponent,DashboardChartsComponent],
  templateUrl: './dashboard-statistics.component.html',
  styleUrl: './dashboard-statistics.component.scss',
})
export class DashboardStatisticsComponent {
  headerStatistics: IDashboardItem[] = SUMMARY_HEADER_STATISTICS;
  footerStatistics: IDashboardItem[] = SUMMARY_FOOTER_STATISTICS;
}
