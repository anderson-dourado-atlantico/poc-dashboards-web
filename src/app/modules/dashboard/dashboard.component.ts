import { Component, OnInit, viewChild } from '@angular/core'
import { NavigationHistoryComponent } from './navigation-history/navigation-history.component'
import { MatListModule } from '@angular/material/list'
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component'
import { CommonModule } from '@angular/common'
import { DashboardService } from '../../shared/services/dashboards.service'
import { Dashboard, DashboardType } from '../../shared/models/dashboard.model'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'

@Component({
  selector: 'poc-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    NavigationHistoryComponent,
    DashboardItemComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private folderParentId = ''
  private navigationHistoryComponent = viewChild.required('navigationHistory', {
    read: NavigationHistoryComponent,
  })

  dashboardContent: Dashboard[] = []

  constructor(
    private dashbardService: DashboardService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRouter.queryParamMap.subscribe(parameters => {
      this.folderParentId = parameters.get('folderParentId') ?? ''
    })

    if (this.folderParentId === '') {
      this.navigationHistoryComponent().clearHistory()
    }
    this.navigateToHistory(this.folderParentId)
  }

  goToContent(item: Dashboard) {
    if (item.type === DashboardType.ITEM) {
      this.router.navigate(['dashboard', 'content'], {
        queryParams: { id: item.id },
      })
    } else {
      this.navigateToHistory(item.id!)
      this.navigationHistoryComponent().addNavigation(item.id!, item.name)
    }
  }

  navigateToHistory(id: string) {
    if (id === '') {
      this.dashbardService.getAll().subscribe(boards => {
        console.log(boards)
        this.dashboardContent = boards
      })
    } else {
      this.dashbardService.accessContent(id).subscribe(boards => {
        console.log('boards => ' + { boards })
        this.dashboardContent = boards
      })
    }
  }
}
