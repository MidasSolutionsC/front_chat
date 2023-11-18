import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CampusComponent } from './campus/campus.component';
import { CoordinationComponent } from './coordination/coordination.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'campus',
    component: CampusComponent
  },
  {
    path: 'coordination',
    component: CoordinationComponent
  },
  { path: 'types', loadChildren: () => import('./type/type.module').then(m => m.TypeModule) },
  { path: 'call-settings', loadChildren: () => import('./call/call.module').then(m => m.CallModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
