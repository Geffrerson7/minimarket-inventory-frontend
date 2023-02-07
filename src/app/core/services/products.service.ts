import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { QuestionBase } from '../models/forms/question-base';
import { DropdownQuestion } from '../models/forms/question-dropdown';
import { formatDate } from '@angular/common';
import {
  TextboxQuestion,
  TextareaQuestion,
  NumberQuestion,
} from '../models/forms/question-textbox';
import { Product } from '../models/Products.model';

const PATH = environment.api;
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = `${PATH}/products`;
  private _refresh$ = new Subject<void>();

  constructor(private _httpclient: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getProducts() {
    return this._httpclient.get<any>(this.url);
  }

  register(body: Product) {
    return this._httpclient.post<any>(this.url, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  update(id: String, body: Product) {
    const url_id = `${this.url}/${id}`;
    return this._httpclient.put<any>(url_id, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  getQuestionsRegister(categories: any[], suppliers: any[], name: string, description: string, precio_venta: string, precio_compra: string, stock: string, thresshold_value: string, fecha_expiracion: string) {
    const questions: QuestionBase<string | number>[] = [
      new TextboxQuestion({
        key: 'name',
        label: 'Product Name',
        value:name,
        required: true,
        order: 1,
      }),
      new TextareaQuestion({
        key: 'description',
        label: 'Description',
        value: description,
        required: false,

        order: 2,
      }),
      new TextboxQuestion({
        key: 'sale_price',
        label: 'Sale price',
        value: precio_venta,
        required: true,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'buy_price',
        label: 'Buy Price',
        value: precio_compra,

        required: true,
        order: 4,
      }),
      new TextboxQuestion({
        key: 'stock',
        label: 'Stock',
        value: stock,
        required: true,

        order: 5,
      }),
      new TextboxQuestion({
        key: 'thresshold_value',
        label: 'Thresshold Value',
        value: thresshold_value,
        required: false,

        order: 5,
      }),
      new TextboxQuestion({
        key: 'expirity_date',
        label: 'Expirity Date',
        value: fecha_expiracion,
        required: false,
        type: 'date',
        order: 6,
      }),
      new DropdownQuestion({
        key: 'availability',
        label: 'Availability',
        options: [
          { key: 'In-stock', value: 'In-stock' },
          { key: 'Out of Stock', value: 'Out of Stock' },
          { key: 'Low Stock', value: 'Low Stock' },
        ],
        required: true,
        order: 7,
      }),
      new DropdownQuestion({
        key: 'category_id',
        label: 'Category',
        options: categories,
        required: true,
        order: 8,
      }),
      new DropdownQuestion({
        key: 'supplier_id',
        label: 'Supplier',
        options: suppliers,
        required: true,
        order: 9,
      }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }

  getUpdateFields(product: Product, categories: any[], suppliers: any[]) {
    const questions: QuestionBase<string | number>[] = [
      new TextboxQuestion({
        key: 'name',
        label: 'Product Name',
        required: true,
        value: product.name,
        order: 1,
      }),
      new TextareaQuestion({
        key: 'description',
        label: 'Description',
        required: false,
        type: 'number',
        value: product.description,
        order: 2,
      }),
      new NumberQuestion({
        key: 'sale_price',
        label: 'Sale price',
        type: 'number',
        value: product.sale_price,
        required: true,
        order: 3,
      }),
      new NumberQuestion({
        key: 'buy_price',
        label: 'Buy Price',
        type: 'number',
        value: product.buy_price,
        required: true,
        order: 4,
      }),
      new NumberQuestion({
        key: 'stock',
        label: 'Stock',
        required: true,
        type: 'number',
        value: product.stock,
        order: 5,
      }),
      new NumberQuestion({
        key: 'thresshold_value',
        label: 'Thresshold Value',
        required: false,
        type: 'number',
        value: product.thresshold_value,
        order: 5,
      }),
      new TextboxQuestion({
        key: 'expirity_date',
        label: 'Expirity Date',
        required: false,
        type: 'date',
        value: product.expirity_date
          ? formatDate(product.expirity_date, 'yyyy-MM-dd', 'en-US','UTC')
          : product.expirity_date,
        order: 6,
      }),
      new DropdownQuestion({
        key: 'availability',
        label: 'Availability',
        options: [
          { key: 'In-stock', value: 'In-stock' },
          { key: 'Out of Stock', value: 'Out of Stock' },
          { key: 'Low Stock', value: 'Low Stock' },
        ],
        value: product.availability,
        required: true,
        order: 7,
      }),
      new DropdownQuestion({
        key: 'category_id',
        label: 'Category',
        options: categories,
        value: product.category_id,
        required: true,
        order: 8,
      }),
      new DropdownQuestion({
        key: 'supplier_id',
        label: 'Supplier',
        options: suppliers,
        value: product.supplier_id,
        required: true,
        order: 9,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
