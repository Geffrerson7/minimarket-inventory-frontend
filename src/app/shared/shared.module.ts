import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { ModalActualizarComponent } from './modal-actualizar/modal-actualizar.component';
import { ModalBorrarComponent } from './modal-borrar/modal-borrar.component';
import { TableCrudComponent } from './table-crud/table-crud.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ModalRegistrarComponent } from './modal-registrar/modal-registrar.component';
import { ModalRegistrarOrderComponent } from './modal-order-registrar/modal-registrar-order.component';
import { ModalActualizarOrderComponent } from './modal-order-actualizar/modal-actualizar-order.component';


@NgModule({
  declarations: [
    SharedComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ModalActualizarComponent,
    ModalBorrarComponent,
    ModalRegistrarComponent,
    TableCrudComponent,
    ModalRegistrarOrderComponent,
    ModalActualizarOrderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports:[
    ModalActualizarComponent,
    ModalRegistrarComponent,
    ModalBorrarComponent,
    TableCrudComponent,
    ModalRegistrarOrderComponent,
    ModalActualizarOrderComponent
  ]
})
export class SharedModule { }
