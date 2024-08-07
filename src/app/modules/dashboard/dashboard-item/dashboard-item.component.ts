import { Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'poc-dashboard-item',
  standalone: true,
  imports: [MatIconModule, MatRippleModule, MatButtonModule],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.scss',
})
export class DashboardItemComponent {
  @Input() name?: string
  private _type?: string = 'folder'

  @Input() set type(value) {
    if (value === 'FOLDER') {
      this._type = 'folder'
    } else {
      this._type = 'bar_chart_4_bars'
    }
  }

  get type() {
    return this._type
  }
}
