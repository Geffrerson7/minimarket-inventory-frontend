import { Component,OnDestroy  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Supplier } from '../core/models/Supplier.model';
import { tableConfig } from '../core/models/table_config.model';
import { SuppliersService } from '../core/services/suppliers.service';
import { ModalActualizarComponent } from '../shared/modal-actualizar/modal-actualizar.component';
import { ModalBorrarComponent } from '../shared/modal-borrar/modal-borrar.component';
import { ModalRegistrarComponent } from '../shared/modal-registrar/modal-registrar.component';
const dataTable = [
  { columnDef: 'id', header: 'Nº Supplier' },
  { columnDef: 'name', header: 'Name' },
  { columnDef: 'description', header: 'Descripción' },
  { columnDef: 'contact_number', header: 'Contact Number' },
  { columnDef: 'email', header: 'Email' },
  { columnDef: 'address', header: 'Address' },
  { columnDef: 'acción', header: 'Acción' }
];
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnDestroy {
  suppliers!: Supplier[];
  tableConfiguration!: tableConfig;
  suscription!: Subscription;
  constructor(
    private supplier_service: SuppliersService,
    public dialog: MatDialog,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getSuppliers();

    this.suscription = this.supplier_service.refresh$.subscribe(()=>{
      this.getSuppliers();
    })
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }


  getSuppliers(){
        this.supplier_service.getSuppliers().subscribe({
      next: rpta=>{
        this.suppliers = rpta['body'];

        this.tableConfig(this.suppliers);

      },
      error: err =>{

      }
    });
  }
  tableConfig(data: any) {
    this.tableConfiguration = {
      search: true,
      pagination: true,
      data: data,
      dataTable: dataTable,
    };
  }


  delete(supplier: any){

    const dialogRef = this.dialog.open(ModalBorrarComponent, {
      width:'400px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.supplier_service.delete(supplier.id).subscribe({
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

  update(supplier: any){
    
    const dialogRef = this.dialog.open(ModalActualizarComponent,{
      width: '400px',
      disableClose: true,
      data: {
        campos: this.supplier_service.getUpdateFields(supplier)
        }
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result !== '')
      {
      this.supplier_service.update(supplier.id,result).subscribe({
        next: rpta=>{
          this.toastr.success('Se actualizó correctamente');
        },
        error: err=>{
          this.toastr.error(err['error']['message'], 'Error');
        },
        complete: ()=>{
          window.location.reload()
        }
      })
      }



    })
  }
  register(event: any){

    const dialogRef = this.dialog.open(ModalRegistrarComponent,{
      width: '400px',
      disableClose: true,
      data: {
        campos: this.supplier_service.getQuestionsRegister()
        }
    });

    dialogRef.afterClosed().subscribe(result=>{

      if (result){
        this.supplier_service.register(result).subscribe({
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
