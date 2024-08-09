import { Component, computed, input, output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'
import {
  Dashboard,
  DashboardType,
} from '../../../shared/models/dashboard.model'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'poc-dashboard-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule, MatButtonModule],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.scss',
})
export class DashboardItemComponent {
  dashboardItem = input.required<Dashboard>()
  disabled = input<boolean>(false)
  onAccessContent = output<Dashboard>()

  typeIcon = computed(() => {
    if (this.dashboardItem().type === DashboardType.FOLDER) {
      return 'folder'
    }

    return 'bar_chart_4_bars'
  })

  _itemPressed() {
    this.onAccessContent.emit(this.dashboardItem())
  }
}
