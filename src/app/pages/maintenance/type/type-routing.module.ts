import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeDocumentComponent } from './type-document/type-document.component';
import { TypeStatusComponent } from './type-status/type-status.component';
import { TypeUserComponent } from './type-user/type-user.component';

const routes: Routes = [
  {
    path: 'typeDocument',
    component: TypeDocumentComponent
  },
  {
    path: 'typeStatus',
    component: TypeStatusComponent
  },
  {
    path: 'typeUser',
    component: TypeUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeRoutingModule { }
