import { Component } from '@angular/core'
import { NavigationHistoryComponent } from './navigation-history/navigation-history.component'
import { MatListModule } from '@angular/material/list'
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'poc-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    NavigationHistoryComponent,
    DashboardItemComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  dashboardContent = [
    { name: 'Folder 1', type: 'FOLDER' },
    { name: 'Folder 2', type: 'FOLDER' },
    { name: 'Folder 3', type: 'FOLDER' },
    { name: 'Dashboard 1', type: 'ITEM' },
    { name: 'Dashboard 2', type: 'ITEM' },
    { name: 'Dashboard 3', type: 'ITEM' },
  ]
}
