import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { QuestionBase } from '../forms/question-base';



@Component({
  selector: 'app-modal-actualizar',
  templateUrl: './modal-actualizar.component.html',
  styleUrls: ['./modal-actualizar.component.scss']
})
export class ModalActualizarComponent implements OnInit {
  fields$: Observable<QuestionBase<any>[]>;


  constructor( public dialogRef: MatDialogRef<ModalActualizarComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fields$ = this.data['campos'];
  }

  ngOnChange(){

  }
  ngOnInit(): void {

  }

  save_edit(update_data: String): void {
    this.dialogRef.close(update_data);
  }

}
