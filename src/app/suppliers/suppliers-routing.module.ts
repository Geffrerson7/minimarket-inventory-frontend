import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { SuppliersComponent } from './suppliers.component';


const routes: Routes = [{
  path: '',
  component: LayoutComponent,
children:[
  {path:'', component: SuppliersComponent},

]
 }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuppliersRoutingModule { }
