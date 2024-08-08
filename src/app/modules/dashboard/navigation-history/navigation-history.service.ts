import { Injectable, signal } from '@angular/core'

export interface NavigationProps {
  id: string
  name: string
}
@Injectable({
  providedIn: 'root',
})
export class NavigationHistoryService {
  private history: NavigationProps[] = []
  private observeChanges$ = signal<NavigationProps[] | null>(null)

  constructor() {
    this.clearHistory()
  }

  get observeChanges() {
    return this.observeChanges$()
  }

  addNavigation(id: string, name: string) {
    this.history.push({
      id,
      name,
    })

    this.observeChanges$.set([...this.history])
  }

  changeToHistory(prop: NavigationProps) {
    if (this._isSameLastId(prop.id)) return

    const changedHistory: NavigationProps[] = []

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index = 0; index < this.history.length; index++) {
      const actualHistory = this.history[index]

      changedHistory.push(actualHistory)
      if (actualHistory.id === prop.id) break
    }

    this.history.length = 0
    changedHistory.forEach(item => this.addNavigation(item.id, item.name))
  }

  private _isSameLastId(id: string): boolean {
    if (this.history.length !== 0) {
      const lastItem = this.history[this.history.length - 1]
      return lastItem.id === id
    }

    return true
  }

  clearHistory(): void {
    this.history.length = 0
    this.addNavigation('', 'root')
  }
}
