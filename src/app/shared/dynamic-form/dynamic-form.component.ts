import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/core/models/forms/question-base';
import { QuestionControlService } from 'src/app/core/services/question-control.service';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  @Input() button_type: String=''
  @Output() editEvent= new EventEmitter<String>()
  @Output() saveEvent= new EventEmitter<String>()
  @Input() isSecondFormValid!: Boolean;
  @Input() secondForm!: Boolean;
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {

    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);

  }


  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  edit(element:string) {
    this.form.invalid?null:this.editEvent.emit(element);
  }
  save(element:string) {

    this.form.invalid?null:this.saveEvent.emit(element);
  }
  cancel(){
    this.editEvent.emit('');
  }
}
