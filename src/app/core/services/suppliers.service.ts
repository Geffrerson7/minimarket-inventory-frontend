import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { QuestionBase } from '../models/forms/question-base';

import { TextboxQuestion } from '../models/forms/question-textbox';
import { Supplier } from '../models/Supplier.model';
const PATH=environment.api
@Injectable({
  providedIn: 'root'
})
export class SuppliersService {


  url = `${PATH}/suppliers`
  constructor(private _httpclient: HttpClient) { }

  getSuppliers(){
    return this._httpclient.get<any>(this.url);
  }

  register(body: Supplier){
    return this._httpclient.post<any>(this.url, body);
  }
  delete(id: String){
    const url_id = `${this.url}/${id}`
    return this._httpclient.delete<any>(url_id);
  }
  update(id: String, body: Supplier){
    const url_id = `${this.url}/${id}`
    return this._httpclient.put<any>(url_id, body);
  }

  getQuestionsRegister() {

    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        required: true,
        order: 2,
      }),
      new TextboxQuestion({
        key: 'contact_number',
        label: 'Contact Number',
        required: true,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        required: true,
        order: 4,
      }),
      new TextboxQuestion({
        key: 'address',
        label: 'Address',
        required: true,
        order: 5,
      }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
  getUpdateFields(supplier: Supplier) {

    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        value: supplier.name,
        order: 1,
      }),
      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        value: supplier.description,
        order: 2,
      }),
      new TextboxQuestion({
        key: 'contact_number',
        label: 'Contact Number',
        value: supplier.contact_number,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        value: supplier.email,
        order: 4,
      }),
      new TextboxQuestion({
        key: 'address',
        label: 'Address',
        value: supplier.address,
        order: 5,
      }),

    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
