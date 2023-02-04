import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
  override controlType = 'textbox';
}

export class TextareaQuestion extends QuestionBase<string> {
  override controlType = 'textarea';
}

export class NumberQuestion extends QuestionBase<number> {
  override controlType = 'textbox';
}
