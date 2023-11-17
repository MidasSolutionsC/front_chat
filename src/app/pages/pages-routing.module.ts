import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { CoordinationsComponent } from './coordinations/coordinations.component';



const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: "",component: ChatComponent },
  { path: 'dashboard', component: ChatComponent },
  { path: 'chat', component: ChatComponent }, 
  { path: 'coordinations', component: CoordinationsComponent }, 
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
