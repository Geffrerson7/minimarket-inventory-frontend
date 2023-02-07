import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { QuestionBase } from 'src/app/core/models/forms/question-base';


interface Option {
  key: string;
  value: string;
}
@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent{
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;

  filteredOptions!: Observable<Option[]> | undefined;


  get isValid() { return this.form.controls[this.question.key].valid; }
  frmMeyveler!: FormGroup;
  options: any;

  constructor(private fb: FormBuilder){}
  ngOnInit() {
    if(this.question.controlType === 'dropdown')
    {
      this.filteredOptions = this.form.get(this.question.key)?.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filter(state) : this.question.options.slice())),
    );
    }

  }

  private _filter(value: string): Option[] {
    const filterValue = value.toLowerCase();
    return this.question.options.filter(option => option.value.toLowerCase().includes(filterValue));
  }
}
