import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/core/models/forms/question-base';
import { Product } from 'src/app/core/models/Product.model';
import { OrderService } from 'src/app/core/services/order.service';
import { ModalActualizarComponent } from '../modal-actualizar/modal-actualizar.component';
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
  selector: 'app-modal-registrar-orden',
  templateUrl: './modal-registrar-order.component.html',
  styleUrls: ['./modal-registrar.component.scss']
})
export class ModalRegistrarOrderComponent{
  fields$: Observable<QuestionBase<any>[]>;

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
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  form!: FormGroup;
  cantidad = new FormControl('', Validators.required);
  constructor( public dialogRef: MatDialogRef<ModalActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.fields$ = this.data['campos'];
      this.dataSource.data = this.data['products'];

    }
    ngOnInit(): void {

        const group: any = {};

        this.dataSource.data.forEach(product=> {
          group[product.id+''] = new FormControl(0, Validators.required)

        });
        this.form=new FormGroup(group);

    }
    cambiar!:Boolean;
    isTouched(){
      this.cambiar = true;

      return this.cambiar;
    }

    save(data: any): void {

      const array_product_cant = []
      let products = this.form.getRawValue();

      for(let product in products){
        if(products[product]!==0)
        {
          array_product_cant.push({
          product:parseInt(product),
          quantity: parseInt(products[product])
        })
        }

      }
      data['client'] = parseInt(data['client'].split('-')[0]);
      data['order_detail'] = array_product_cant;
      console.log(data)
      this.dialogRef.close(data);
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
}
