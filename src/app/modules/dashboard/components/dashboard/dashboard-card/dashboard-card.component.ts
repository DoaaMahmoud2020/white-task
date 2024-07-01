import { Component, InputSignal, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IDashboardItem } from '@app/modules/dashboard/models/dashoard-item.model';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss',
})
export class DashboardCardComponent {
  config: InputSignal<IDashboardItem> = input.required();
}
