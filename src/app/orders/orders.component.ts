import { Component } from '@angular/core';
import { Supplier } from '../core/models/Supplier.model';
import { SuppliersService } from '../core/services/suppliers.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  mensaje = ''

  constructor(private _supplier: SuppliersService){

  }

  listar(){

  }

  ngOnInit(){
    this._supplier.getSuppliers().subscribe(
      {
        next: rpta=>{

        },
        error: err=>{
          this.mensaje =err;
        }
      }
    )
  }
}
