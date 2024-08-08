import { CommonModule } from '@angular/common'
import { Component, computed, OnInit, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DashboardService } from '../../../shared/services/dashboards.service'
import { Dashboard } from '../../../shared/models/dashboard.model'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'poc-dashboard-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss',
})
export class DashboardContentComponent implements OnInit {
  id?: string | null
  dashboard = signal<Dashboard | null>(null)

  safeUrl = computed(() => {
    const dash = this.dashboard()
    if (!dash) return null

    if (this._isValidUrl(dash.embeddedLink!)) {
      return this._sanitizeUrl(dash.embeddedLink!)
    } else {
      return null
    }
  })

  constructor(
    private dashboardService: DashboardService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.activatedRouter.queryParamMap.subscribe(parameters => {
      this.id = parameters.get('id')
    })

    this.dashboardService
      .getDashboardContentById(this.id!)
      .subscribe(dashboard => {
        this.dashboard.set(dashboard)
      })
  }

  voltarParaDashboard() {
    this.router.navigate(['dashboard'], {
      queryParams: { folderParentId: this.dashboard()!.folderParentId },
    })
  }

  private _isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  private _sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
