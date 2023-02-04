import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { QuestionBase } from '../models/forms/question-base';
import { NumberQuestion } from '../models/forms/question-textbox';
import { TextboxQuestion } from '../models/forms/question-textbox';
import { Category } from '../models/Category.model';
import { tap } from 'rxjs/operators';

const PATH=environment.api

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url = `${PATH}/categories`
  private _refresh$ = new Subject<void>();
  constructor(private _httpclient: HttpClient) { }
  get refresh$() {
    return this._refresh$;
  }
  getCategories(){
    return this._httpclient.get<any>(this.url);
  }
  register(body: Category){
    return this._httpclient.post<any>(this.url, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id: String){
    const url_id = `${this.url}/${id}`
    return this._httpclient.delete<any>(url_id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(id: String, body: Category){
    const url_id = `${this.url}/${id}`
    return this._httpclient.put<any>(url_id, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );;
  }
  getQuestionsRegister() {
    const questions: QuestionBase<string | number>[] = [
      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
      }),
      new NumberQuestion({
        key: 'max_storage_temperature',
        label: 'Maximun temperature',
        required: true,
        order: 2,
      }),
      new NumberQuestion({
        key: 'min_storage_temperature',
        label: 'Minimun temperature',
        required: true,
        order: 3,
      }),
    ]
    return of(questions.sort((a, b) => a.order - b.order));
  }
  getUpdateFields(category: Category) {

    const questions: QuestionBase<string | number>[] = [
      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        value: category.name,
        order: 1,
      }),
      new NumberQuestion({
        key: 'max_storage_temperature',
        label: 'Maximun temperature',
        value: category.max_storage_temperature,
        order: 2,
      }),
      new NumberQuestion({
        key: 'min_storage_temperature',
        label: 'Minimun temperature',
        value: category.min_storage_temperature,
        order: 3,
      }),
      
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
