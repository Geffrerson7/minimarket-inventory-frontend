import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Client } from '../models/Client.model';
import { QuestionBase } from '../models/forms/question-base';
import { DropdownQuestion } from '../models/forms/question-dropdown';
import { TextboxQuestion } from '../models/forms/question-textbox';
import { Order } from '../models/order.model';
import { Supplier } from '../models/Supplier.model';
const PATH=environment.api;
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = `${PATH}/orders`;
  private _refresh$ = new Subject<void>();
  constructor(private _httpClient: HttpClient) { }
  get refresh$() {
    return this._refresh$;
  }
  getOrders(){
    return this._httpClient.get<any>(this.url);
  }
  register(body: Order){
    return this._httpClient.post(this.url, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  update(id: String, body: Order) {
    const url_id = `${this.url}/${id}`;
    return this._httpClient.put<any>(url_id, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  delete(id: String) {
    const url_id = `${this.url}/${id}`;
    return this._httpClient.delete<any>(url_id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  getQuestionsRegister(clients: any[], products_quantities: any[]) {

    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'order_code',
        label: 'Order code',
        type: 'text',
        required: true,
        order: 1,
      }),
      new DropdownQuestion({
        key: 'client',
        label: 'Client',
        options: clients,
        required: true,
        order: 2,
      })
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
  getUpdateFields(client:string, order_code: string, clients: any[]) {
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'order_code',
        label: 'Order code',
        type: 'text',
        value: order_code,
        required: true,
        order: 1,
      }),
      new DropdownQuestion({
        key: 'client',
        label: 'Client',
        value: client,
        options: clients,
        required: true,
        order: 2,
      })
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }

  data: any;
  second(data: any){
    this.data = data
    return this.data;
  }

  get(){
    return this.data;
  }
}
