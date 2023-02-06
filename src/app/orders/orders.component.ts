import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../core/models/Client.model';
import { Order } from '../core/models/order.model';
import { Product } from '../core/models/Product.model';
import { tableConfig } from '../core/models/table_config.model';
import { ClientsService } from '../core/services/clients.service';
import { OrderService } from '../core/services/order.service';
import { ProductsService } from '../core/services/products.service';
import { ModalRegistrarOrderComponent } from '../shared/modal-order-registrar/modal-registrar.component';
import { ModalRegistrarComponent } from '../shared/modal-registrar/modal-registrar.component';

const dataTable = [
  { columnDef: 'id', header: 'Nº Order' },
  { columnDef: 'order_code', header: 'Order Code' },
  { columnDef: 'client', header: 'Client' },
  { columnDef: 'order_detail', header: 'Order detail' }
];
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  tableConfiguration!: tableConfig;
  mensaje = ''
  clients!: Client[]
  products!: Product[]
  products_complete!: Product[]
  orders!: Order[]
  constructor(
    private _order: OrderService,
    private _client: ClientsService,
    private _products: ProductsService,
    public dialog: MatDialog,
    private toastr: ToastrService

    ){

  }

  listar(){

  }

  ngOnInit(){

    this._client.getClients().subscribe({
      next: rpta=>{
        this.clients = rpta['body'].map((client: any)=>{
          return {key: client.id, value: client.name}
        })

      }
    })

    this._products.getProducts().subscribe({
      next: rpta =>{
        this.products_complete = rpta['body'];
        this.products = rpta['body'].map((product: any)=>{
          return {key: product.id, value: product.name}
        })


      }
    })



    this._order.getOrders().subscribe({
      next: rpta=>{
        this.orders = rpta['body'];
        this.tableConfig(this.orders);
      }
    })

  }

  tableConfig(data: any) {
    this.tableConfiguration = {
      search: true,
      pagination: true,
      data: data,
      dataTable: dataTable,
    };
  }
  register(event: any){

    const dialogRef = this.dialog.open(ModalRegistrarOrderComponent,{
      width: '1000px',
      disableClose: true,
      data: {
        campos: this._order.getQuestionsRegister(this.clients, this.products),
        products: this.products_complete.map((product:Product)=>{
          return   {
            id: product.id,
            name: product.name,
            stock: product.stock,
            children:
            [
            {name: `Description: ${product.description}`},
            {name: `Sale price: S/ ${product.sale_price}`},
            {name: `Buy price: S/ ${product.buy_price}`},
            {name: `Thresshold: ${product.thresshold_value}`},
            {name: `Expirity date: ${product.expirity_date}`},
            {name: `Availability: ${product.availability}`},
          ],
          }
        })
        }
    });

    dialogRef.afterClosed().subscribe(result=>{

      if (result){
        this._order.register(result).subscribe({
        next: rpta=>{
          this.toastr.success('Registrado');
        },
        error: err=>{
          this.toastr.error(err['error']['message'], 'Error');
        },
        complete: ()=>{

        }
      })
      }


    })
  }
}
