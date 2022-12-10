import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { MapComponent } from './components/map/map.component';
const routes: Routes = [
  {
    path: '',
    redirectTo : 'dashboard',
    pathMatch: 'full',
  },
  {
    path:'dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',  
    component: ErrorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
