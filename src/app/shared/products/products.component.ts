import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuestionBase } from 'src/app/core/models/forms/question-base';
import { OrderService } from 'src/app/core/services/order.service';
interface Node {
  id: string;
  name: string;
  stock: string;
  children?: Node[];
}


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  id: string;
  name: string;
  stock: string;
  level: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @Input()  products_dialog!: any;
  form!: FormGroup;
  @Output() dataSecondForm = new EventEmitter<any>();

  cantidad = new FormControl(Validators.required);



  private _transformer = (node: Node, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        id: node.id,
        name: node.name,
        stock: node.stock,
        level: level,
      };
    };
    treeControl = new FlatTreeControl<ExampleFlatNode>(

      node => node.level,
      node => node.expandable,
    );

    treeFlattener = new MatTreeFlattener(
      this._transformer,
      node => node.level,
      node => node.expandable,
      node => node.children,
    );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(private _order: OrderService ) {


    }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(){

    this.dataSource.data = this.products_dialog;

    const group: any = {};

    this.dataSource.data.forEach((product:any)=> {
      group[product.id+''] = new FormControl(0, Validators.required)

    });
    this.form=new FormGroup(group);

}

  toInt(value: string){
    return parseInt(value);
  }

  add(controlName:string,contador: number, stock: number){

    if(contador===stock)
    this.form.get(controlName)?.setValue(contador);
    else
    {
      contador++
      this.form.get(controlName)?.setValue(contador);
    }

  }

  less(controlName:string, contador:number, stock: number){

    if(contador===0||this.form.get(controlName)?.value>stock)
    this.form.get(controlName)?.setValue(0);
    else
    {
      contador--
      this.form.get(controlName)?.setValue(contador);
    }
  }

  invalidCantidad!:Boolean;
  updateStock(stock: number,  contador:number, idMatError: string){

    if(contador>stock)
    {
      this.invalidCantidad = true;
      return 0
    }
    else{
     return stock-contador;
    }


  }

  save(data: any): void {
    const array_product_cant = []
    let products = this.form.getRawValue();

    for(let product in products){
      if(products[product]!=='')
      {
        array_product_cant.push({
        product:parseInt(product),
        quantity: parseInt(products[product])
      })
      }

    }
    data['client'] = parseInt(data['client'].split('-')[0]);
    data['order_detail'] = array_product_cant;

    this.dataSecondForm.emit(data);

  }
  cambiar!:Boolean;
  isTouched(){
    this.cambiar = true;
    return this.cambiar;
  }

}
