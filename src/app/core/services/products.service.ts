import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
const PATH=environment.api;
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = `${PATH}/products`
  constructor(private _httpclient: HttpClient) { }
  getProducts(){
    return this._httpclient.get<any>(this.url);
  }
}
