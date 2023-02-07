import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Client } from '../core/models/Client.model';
import { Order } from '../core/models/order.model';
import { Product } from '../core/models/Product.model';
import { tableConfig } from '../core/models/table_config.model';
import { ClientsService } from '../core/services/clients.service';
import { OrderService } from '../core/services/order.service';
import { ProductsService } from '../core/services/products.service';
import { ModalActualizarComponent } from '../shared/modal-actualizar/modal-actualizar.component';
import { ModalBorrarComponent } from '../shared/modal-borrar/modal-borrar.component';
import { ModalActualizarOrderComponent } from '../shared/modal-order-actualizar/modal-actualizar-order.component';
import { ModalRegistrarOrderComponent } from '../shared/modal-order-registrar/modal-registrar-order.component';
import { ModalRegistrarComponent } from '../shared/modal-registrar/modal-registrar.component';

const dataTable = [
  { columnDef: 'id', header: 'Nº Order' },
  { columnDef: 'order_code', header: 'Order Code' },
  { columnDef: 'client', header: 'Client' },
  { columnDef: 'order_details', header: 'Products quantity' },
  { columnDef: 'acción', header: 'Acción' }
];
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  tableConfiguration!: tableConfig;
  mensaje = '';
  suscription!: Subscription;
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
    this.getOrders();
    this.getProducts();
    this.getClients();
    this.suscription = this._order.refresh$.subscribe(() => {
      this.getOrders();
    });

  }
  getOrders(){
        this._order.getOrders().subscribe({
      next: rpta=>{
        this.orders = rpta['body']
        .map((element: any, index: number)=>{
          const name = element.client.name;
          const id = element.client.id;
          element.client = name;
          // const cantidad = element.order_detail.length;
          // element.order_detail =
          return element;
        });
        console.log(this.orders)
        this.tableConfig(this.orders);
      }
    })
  }
  getProducts(): void {

    this._products.getProducts().subscribe({
      next: rpta =>{
        this.products_complete = rpta['body'];
        this.products = rpta['body'].map((product: any)=>{
          return {key: product.id, value: product.name}
        })
      }
    })
  }

  getClients(): void{
    this._client.getClients().subscribe({
      next: rpta=>{
        this.clients = rpta['body'].map((client: any)=>{
          return {key: client.id, value: client.name}
        })

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

  update(event: any){

    const dialogRef = this.dialog.open(ModalActualizarOrderComponent,{
      width: '1000px',
      disableClose: true,
      data: {
        campos: this._order.getUpdateFields(event['client'],event['order_code'],this.clients),
        products: this.products_complete.map((product:Product, index: number)=>{
          return   {
            id: product.id,
            name: product.name,
            quantity: 5,
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

        console.log(result)
        this._order.update(event['id'],result).subscribe({
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
  delete(order: any){

    const dialogRef = this.dialog.open(ModalBorrarComponent, {
      width:'400px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this._order.delete(order.id).subscribe({
          next: rpta=>{
            this.toastr.success('Se eliminó correctamente');
          },
          error: err=>{
            this.toastr.error(err['error']['message'], 'Error');
          },
          complete() {

          },
        })
      }
    });
  }
}
