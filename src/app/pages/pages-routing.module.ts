import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import { MainComponent } from './main/main/main.component';
import { jwtAuthGuard, hasRoleGuard } from '../core/guards';
import { CallComponent } from './call/call.component';
import { AllowedIpComponent } from './allowed-ip/allowed-ip.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: "",
    component: MainComponent
  },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'main', component: MainComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'mains', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'maintenances', loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule) },
  { path: 'call', component: CallComponent},
  // { path: 'sale', component: FormComponent, canActivate: [hasRoleGuard] },
  { path: 'allowed-ip', component: AllowedIpComponent, canActivate: [hasRoleGuard] },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
