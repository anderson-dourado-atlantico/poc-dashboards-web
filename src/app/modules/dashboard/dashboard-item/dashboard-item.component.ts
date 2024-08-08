import { Component, computed, input, output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import {
  Dashboard,
  DashboardType,
} from '../../../shared/models/dashboard.model'

@Component({
  selector: 'poc-dashboard-item',
  standalone: true,
  imports: [MatIconModule, MatRippleModule, MatButtonModule],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.scss',
})
export class DashboardItemComponent {
  dashboardItem = input.required<Dashboard>()
  onAccessContent = output<Dashboard>()

  typeIcon = computed(() => {
    if (this.dashboardItem().type === DashboardType.FOLDER) {
      return 'folder'
    }

    return 'bar_chart_4_bars'
  })

  _showContent() {
    this.onAccessContent.emit(this.dashboardItem())
  }
}
