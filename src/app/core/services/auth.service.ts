import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
const PATH=environment.api
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${PATH}/users`

  constructor(private _httpclient: HttpClient) { }

  login(body_login: any){
    return this._httpclient.post<any>(`${this.url}/login`, body_login);
  }
}
