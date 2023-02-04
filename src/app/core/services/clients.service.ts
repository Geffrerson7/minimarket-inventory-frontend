import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
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
  constructor(private _httpclient: HttpClient) {}

  getClients() {
    return this._httpclient.get<any>(this.url);
  }

  register(body: Client){
    
    return this._httpclient.post<any>(this.url, body);
  }

  getQuestionsRegister() {

    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key: 'document_id',
        label: 'Documento Identidad',
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

}
