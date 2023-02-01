import { NgModule } from '@angular/core';
import { ChildActivationEnd, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ManageStoreComponent } from './manage-store.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
children:[
  {path:'', component: ManageStoreComponent}
]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageStoreRoutingModule { }
