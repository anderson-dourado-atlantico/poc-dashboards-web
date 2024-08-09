import { CommonModule } from '@angular/common'
import { Component, input, output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatLabel } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import {
  Dashboard,
  DashboardProps,
  DashboardType,
} from '../../../shared/models/dashboard.model'
import { MatDialog } from '@angular/material/dialog'
import { DashboardDialogComponent } from './dashboard-dialog/dashboard-dialog.component'
import { map, Observable } from 'rxjs'

@Component({
  selector: 'poc-add-update-dashboard',
  standalone: true,
  imports: [CommonModule, MatLabel, MatIconModule, MatButtonModule],
  templateUrl: './add-update-dashboard.component.html',
  styleUrl: './add-update-dashboard.component.scss',
})
export class AddUpdateDashboardComponent {
  folderParentId = input.required<string>()
  editMode = false
  editModeChanged = output<boolean>()
  addContentDetected = output<DashboardProps>()

  constructor(public dialog: MatDialog) {}

  addFolder() {
    if (!this.editMode) {
      this._openDialog(
        new Dashboard({
          name: '',
          type: DashboardType.FOLDER,
          folderParentId: this.folderParentId(),
        }),
      )
    }
  }

  addDashboard() {
    if (!this.editMode) {
      this._openDialog(
        new Dashboard({
          name: '',
          type: DashboardType.ITEM,
          folderParentId: this.folderParentId(),
        }),
      )
    }
  }

  updateValuesFor(item: Dashboard): Observable<Dashboard | null> {
    const dialogRef = this.dialog.open(DashboardDialogComponent, {
      data: { ...item, editMode: true },
    })

    return dialogRef.afterClosed().pipe(
      map((result: DashboardProps) => {
        if (result !== undefined) {
          return new Dashboard({ ...result, id: item.id })
        }

        return null
      }),
    )
  }

  _clickEditMode() {
    this.editMode = !this.editMode
    this.editModeChanged.emit(this.editMode)
  }

  private _openDialog(dashboard: Dashboard) {
    const dialogRef = this.dialog.open(DashboardDialogComponent, {
      data: dashboard,
    })

    dialogRef.afterClosed().subscribe((result: DashboardProps) => {
      if (result !== undefined) {
        this.addContentDetected.emit(result)
      }
    })
  }
}
