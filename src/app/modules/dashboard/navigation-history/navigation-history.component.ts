import { Component, effect, output } from '@angular/core'
import {
  NavigationHistoryService,
  NavigationProps,
} from './navigation-history.service'
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router'

@Component({
  selector: 'poc-navigation-history',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './navigation-history.component.html',
  styleUrls: ['./navigation-history.component.scss'],
})
export class NavigationHistoryComponent {
  histories: NavigationProps[] = []
  onNavigationHistory = output<string>()

  constructor(
    private navigationHistoryService: NavigationHistoryService,
    private router: Router,
  ) {
    effect(() => {
      const newHistories = this.navigationHistoryService.observeChanges
      if (newHistories) {
        this._changeHistoryPanel(newHistories)
      }
    })
  }

  addNavigation(id: string, name: string) {
    this.navigationHistoryService.addNavigation(id, name)
  }

  goToHistory(prop: NavigationProps) {
    this.navigationHistoryService.changeToHistory(prop)
    this.onNavigationHistory.emit(prop.id)
  }

  clearHistory() {
    this.navigationHistoryService.clearHistory()
  }

  goToHome() {
    this.navigationHistoryService.clearHistory()
    this.router.navigate(['/'])
  }

  private _changeHistoryPanel(newHistories: NavigationProps[]) {
    this.histories.length = 0
    newHistories.forEach(item => this.histories!.push(item))
  }
}
