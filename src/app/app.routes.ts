import { Routes } from '@angular/router'
import { DashboardComponent } from './modules/dashboard/dashboard.component'
import { HomeComponent } from './general/home/home.component'
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component'
import { DashboardContentComponent } from './modules/dashboard/dashboard-content/dashboard-content.component'

export const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'content', component: DashboardContentComponent },
    ],
  },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
]
