import { Routes } from '@angular/router'
import { DashboardComponent } from './modules/dashboard/dashboard.component'
import { HomeComponent } from './general/home/home.component'
import { PageNotFoundComponent } from './general/page-not-found/page-not-found.component'

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
]
