import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { QuestionBase } from '../models/forms/question-base';

import { TextboxQuestion } from '../models/forms/question-textbox';
import { Client } from '../models/Client.model';
const PATH = environment.api;

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  url = `${PATH}/clients`;
  private _refresh$ = new Subject<void>();

  constructor(private _httpclient: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getClients() {
    return this._httpclient.get<any>(this.url);
  }

  register(body: Client) {
    return this._httpclient.post<any>(this.url, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  update(id: String, body: Client) {
    const url_id = `${this.url}/${id}`;
    return this._httpclient.put<any>(url_id, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  getQuestionsRegister() {
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'document_id',
        label: 'Document ID',
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        required: true,
        order: 2,
      }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }

  getUpdateFields(client: Client) {
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'document_id',
        label: 'Document ID',
        value: client.document_id,
        order: 1,
      }),
      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        value: client.name,
        order: 2,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
