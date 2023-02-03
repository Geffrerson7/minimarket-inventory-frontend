import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from '../forms/question-base';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent{
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;


  get isValid() { return this.form.controls[this.question.key].valid; }
  frmMeyveler!: FormGroup;
  options: any;

  constructor(private fb: FormBuilder){}

}
