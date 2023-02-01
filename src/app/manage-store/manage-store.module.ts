import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStoreRoutingModule } from './manage-store-routing.module';
import { ManageStoreComponent } from './manage-store.component';


@NgModule({
  declarations: [
    ManageStoreComponent
  ],
  imports: [
    CommonModule,
    ManageStoreRoutingModule
  ]
})
export class ManageStoreModule { }
