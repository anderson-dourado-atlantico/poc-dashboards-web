import { HttpClient } from '@angular/common/http'
import { ServiceBase } from './base/service-base'
import { Dashboard } from '../models/dashboard.model'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class DashboardService extends ServiceBase<Dashboard> {
  constructor(protected http: HttpClient) {
    super(http, 'dashboards')
  }

  include() {
    this.persist(null, '/include').subscribe({
      complete: () => console.log('Incluido valores de dashboard'),
    })
  }

  accessContent(id: string) {
    return this.get<Dashboard[]>(`/access/${id}`)
  }

  getDashboardContentById(id: string) {
    return this.get<Dashboard>(`/${id}`)
  }

  addDashboardContent(dashboard: Dashboard) {
    return super.persist({ ...dashboard.props })
  }

  updateDashboardContent(dashboard: Dashboard) {
    return super.update({ ...dashboard.props }, dashboard.id!)
  }

  deleteDashboardContent(id: string) {
    return super.delete(id)
  }
}
