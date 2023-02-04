import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateSessionGuard } from '../core/guards/validate-session.guard';
import { LayoutComponent } from '../layout/layout.component';
import { SuppliersComponent } from './suppliers.component';


const routes: Routes = [{
  path: '',
  component: LayoutComponent,
children:[
  {path:'', component: SuppliersComponent, canActivate: [ValidateSessionGuard]},

], canActivate: [ValidateSessionGuard]
 }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ ValidateSessionGuard, Permissions]
})
export class SuppliersRoutingModule { }
