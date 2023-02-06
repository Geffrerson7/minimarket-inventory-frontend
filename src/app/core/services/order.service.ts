import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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
  url = `${PATH}/orders`
  constructor(private _httpClient: HttpClient) { }
  getOrders(){
    return this._httpClient.get<any>(this.url);
  }
  register(body: Order){
    return this._httpClient.post(this.url, body);
  }
  getQuestionsRegister(clients: any[], products_quantities: any[]) {
    console.log(products_quantities, 'product');
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'order_code',
        label: 'Order code',
        type: 'number',
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
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
