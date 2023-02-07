import { Component,OnDestroy  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from '../core/models/Products.model';
import { Category } from '../core/models/Category.model';
import { Supplier } from '../core/models/Supplier.model';
import { tableConfig } from '../core/models/table_config.model';
import { ProductsService } from '../core/services/products.service';
import { CategoriesService } from '../core/services/categories.service';
import { SuppliersService } from '../core/services/suppliers.service';
import { ModalRegistrarComponent } from '../shared/modal-registrar/modal-registrar.component';
import { ModalActualizarComponent } from '../shared/modal-actualizar/modal-actualizar.component';

const dataTable = [
  { columnDef: 'name', header: 'Product' },
  { columnDef: 'sale_price', header: 'Sale Price' },
  { columnDef: 'stock', header: 'Stock' },
  { columnDef: 'thresshold_value', header: 'Thresshold Value' },
  { columnDef: 'expirity_date', header: 'Expirity Date' },
  { columnDef: 'availability', header: 'Availability' },
  { columnDef: 'acción', header: 'Acción' },
];
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent  implements OnDestroy{
  products!: Product[];
  tableConfiguration!: tableConfig;
  suscription!: Subscription;
  categories!: Category[];
  suppliers!: Supplier[];
  constructor(
    private product_service: ProductsService,
    private category_service: CategoriesService,
    private supplier_service: SuppliersService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getSuppliers();
    this.suscription = this.product_service.refresh$.subscribe(() => {
      this.getProducts();
    });
  }

  ngOnChange() {}
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
  tableConfig(data: any) {
    this.tableConfiguration = {
      search: true,
      pagination: true,
      data: data,
      dataTable: dataTable,
    };
  }

  getProducts(): void {
    this.product_service.getProducts().subscribe({
      next: (rpta) => {
        this.products = rpta['body'];

        this.tableConfig(this.products);
      },
      error: (err) => {},
    });
  }

  getCategories(): void {
    this.category_service.getCategories().subscribe({
      next: (rpta) => {
        this.categories = rpta['body'].map((category: any) => {
          return {key: Number(category.id), value: category.name}
        });

      },
      error: (err) => {},
    });
  }

  getSuppliers(): void {
    this.supplier_service.getSuppliers().subscribe({
      next: (rpta) => {
        this.suppliers = rpta['body'].map((supplier: any) => {
          return {key: Number(supplier.id), value: supplier.name}
        });
      },
      error: (err) => {},
    });
  }

  register(event: any) {

    const dialogRef = this.dialog.open(ModalRegistrarComponent, {
      width: '400px',
      disableClose: true,
      data: {
        campos: this.product_service.getQuestionsRegister(this.categories,this.suppliers),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if (result) {
        for (const key in result) {
          if (!isNaN(parseFloat(result[key])) && key!="expirity_date") {
            result[key] = parseFloat(result[key]);
          }
        }
        result["expirity_date"] =  new Date(result["expirity_date"]);
        result["thresshold_value"] = Number(result["thresshold_value"])
        this.product_service.register(result).subscribe({
          next: (rpta) => {
            this.toastr.success('Registrado');
          },
          error: (err) => {
            this.toastr.error(err['error']['message'], 'Error');
          },
          complete: () => {},
        });
      }
    });
  }

  update(product: any) {
    const dialogRef = this.dialog.open(ModalActualizarComponent, {
      width: '400px',
      disableClose: true,
      data: {
        campos: this.product_service.getUpdateFields(product,this.categories,this.suppliers),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== '') {
        for (const key in result) {
          if (!isNaN(parseFloat(result[key])) && key!="expirity_date") {
            result[key] = parseFloat(result[key]);
          }
        }
        result["thresshold_value"] = Number(result["thresshold_value"])
        result["expirity_date"] =  new Date(result["expirity_date"]);
        this.product_service.update(product.id, result).subscribe({
          next: (rpta) => {
            this.toastr.success('Se actualizó correctamente');
          },
          error: (err) => {
            this.toastr.error(err['error']['message'], 'Error');
          },
          complete: () => {},
        });
      }
    });
  }
}
