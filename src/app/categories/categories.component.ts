import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../core/models/Category.model';
import { tableConfig } from '../core/models/table_config.model';
import { CategoriesService } from '../core/services/categories.service';
import { ModalActualizarComponent } from '../shared/modal-actualizar/modal-actualizar.component';
import { ModalBorrarComponent } from '../shared/modal-borrar/modal-borrar.component';
import { ModalRegistrarComponent } from '../shared/modal-registrar/modal-registrar.component';

const dataTable = [
  { columnDef: 'id', header: 'Nº Category' },
  { columnDef: 'name', header: 'Name' },
  { columnDef: 'max_storage_temperature', header: 'Maximum temperature (°C)' },
  { columnDef: 'min_storage_temperature', header: 'Minimum temperature (°C)' },
  { columnDef: 'acción', header: 'Action' }
]

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories!: Category[];
  tableConfiguration!: tableConfig;
  subscription!: Subscription;

  constructor(
    private category_service: CategoriesService,
    public dialog: MatDialog,
    private toastr: ToastrService
    ) { }

    ngOnInit(): void {
      this.getCategories();
      this.subscription = this.category_service.refresh$.subscribe(() => {
        this.getCategories();
      });
    }

    ngOnChange(){

    }
    tableConfig(data: any) {
      this.tableConfiguration = {
        search: true,
        pagination: true,
        data: data,
        dataTable: dataTable,
      };
    }

    getCategories(): void {
      this.category_service.getCategories().subscribe({
        next: (rpta) => {
          this.categories = rpta['body'];
  
          this.tableConfig(this.categories);
        },
        error: (err) => {},
      });
    }

    delete(category: any){

      const dialogRef = this.dialog.open(ModalBorrarComponent, {
        width:'400px',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
  
        if(result){
          this.category_service.delete(category.id).subscribe({
            next: (rpta)=>{
              console.log(rpta)
            },
            error: (err)=>{
              console.log(err)
            },
            complete() {
              window.location.reload()
            },
          })
        }
      });
    }
  
    update(category: any){
  
      const dialogRef = this.dialog.open(ModalActualizarComponent,{
        width: '400px',
        disableClose: true,
        data: {
          campos: this.category_service.getUpdateFields(category)
          }
      });
  
      dialogRef.afterClosed().subscribe((result)=>{
        if(result!== '')
        {for (const key in result) {
          if (!isNaN(parseFloat(result[key]))) {
            result[key] = parseFloat(result[key]);
          }
        }
        this.category_service.update(category.id,result).subscribe({
          next: (rpta)=>{
            this.toastr.success('Se actualizó correctamente');
          },
          error: (err)=>{
            console.log(err)
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
          campos: this.category_service.getQuestionsRegister()
          }
      });
  
      dialogRef.afterClosed().subscribe((result)=>{
  
        if (result){
          for (const key in result) {
            if (!isNaN(parseFloat(result[key]))) {
              result[key] = parseFloat(result[key]);
            }
          }
          this.category_service.register(result).subscribe({
          next: (rpta)=>{
            this.toastr.success('Registrado');
          },
          error: (err)=>{
            console.log(err)
            this.toastr.error(err['error']['message'], 'Error');
          },
          complete: ()=>{
  
          }
        })
        }
  
  
      })
    }
}
