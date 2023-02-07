import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
children:[
  {path:'', component: CategoriesComponent},

]
 }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
