import { Component, OnInit, viewChild } from '@angular/core'
import { NavigationHistoryComponent } from './navigation-history/navigation-history.component'
import { MatListModule } from '@angular/material/list'
import { DashboardItemComponent } from './dashboard-item/dashboard-item.component'
import { CommonModule } from '@angular/common'
import { DashboardService } from '../../shared/services/dashboards.service'
import {
  Dashboard,
  DashboardProps,
  DashboardType,
} from '../../shared/models/dashboard.model'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { AddUpdateDashboardComponent } from './add-update-dashboard/add-update-dashboard.component'
import { MatDividerModule } from '@angular/material/divider'

@Component({
  selector: 'poc-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatDividerModule,
    NavigationHistoryComponent,
    DashboardItemComponent,
    AddUpdateDashboardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  folderParentId = ''
  private navigationHistoryComponent = viewChild.required('navigationHistory', {
    read: NavigationHistoryComponent,
  })

  private addUpdateDashboardComponent = viewChild.required(
    'addUpdateDashboard',
    { read: AddUpdateDashboardComponent },
  )

  dashboardContentList: Dashboard[] = []
  editMode = false

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

  accessContent(item: Dashboard) {
    if (this.editMode) {
      this.editContent(item)
      return
    }

    if (item.type === DashboardType.ITEM) {
      this.router.navigate(['dashboard', 'content'], {
        queryParams: { id: item.id },
      })
    } else {
      this.navigateToHistory(item.id!)
      this.navigationHistoryComponent().addNavigation(item.id!, item.name)
      this.folderParentId = item.id!
    }
  }

  editContent(item: Dashboard) {
    this.addUpdateDashboardComponent()
      .updateValuesFor(item)
      .subscribe(result => {
        if (result !== null) {
          this.dashbardService.updateDashboardContent(result).subscribe(() => {
            console.log('Dashboar atualizado com sucesso!!')
            this.navigateToHistory(item.folderParentId ?? '')
          })
        }
      })
  }

  navigateToHistory(id: string) {
    if (id === '') {
      this.dashbardService.getAll().subscribe(boards => {
        console.log(boards)
        this.dashboardContentList = boards
      })
    } else {
      this.dashbardService.accessContent(id).subscribe(boards => {
        this.dashboardContentList = boards
      })
    }
  }

  editModeChanged(editMode: boolean) {
    this.editMode = editMode
  }

  adddDashboardContent(item: DashboardProps) {
    const dash = new Dashboard(item)
    this.dashbardService.addDashboardContent(dash).subscribe(() => {
      console.log('Dashboard incluido com sucesso!!')
      this.navigateToHistory(item.folderParentId ?? '')
    })
  }
}
