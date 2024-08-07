import { Injectable } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class NavigationHistoryService {
  private history: string[] = ['root']

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.history.push(event.urlAfterRedirects)
      })
  }

  getHistory(): string[] {
    return this.history
  }

  clearHistory(): void {
    this.history = []
  }
}
