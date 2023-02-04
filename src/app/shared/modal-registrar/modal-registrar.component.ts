import { Component, OnInit, Inject} from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { QuestionBase } from '../forms/question-base';
import { ModalActualizarComponent } from '../modal-actualizar/modal-actualizar.component';


@Component({
  selector: 'app-modal-registrar',
  templateUrl: './modal-registrar.component.html',
  styleUrls: ['./modal-registrar.component.scss']
})
export class ModalRegistrarComponent implements OnInit {
  fields$: Observable<QuestionBase<any>[]>;
  constructor( public dialogRef: MatDialogRef<ModalActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.fields$ = this.data['campos'];
    }
    ngOnInit(): void {}

    save(update_data: String): void {
      this.dialogRef.close(update_data);
    }

}
