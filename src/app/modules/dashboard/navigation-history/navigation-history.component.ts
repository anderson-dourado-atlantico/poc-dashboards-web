import { Component, OnInit } from '@angular/core'
import { NavigationHistoryService } from './navigation-history.service'
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
export class NavigationHistoryComponent implements OnInit {
  history: string[] = ['root', 'Operações']

  constructor(
    private navigationHistoryService: NavigationHistoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.history = this.navigationHistoryService.getHistory()
    console.log(this.navigationHistoryService.getHistory())
  }

  clearHistory(): void {
    this.navigationHistoryService.clearHistory()
    this.history = []
  }

  goToHome() {
    this.router.navigate(['/'])
  }
}
