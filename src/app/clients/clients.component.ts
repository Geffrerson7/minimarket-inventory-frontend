import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../core/models/Client.model';
import { tableConfig } from '../core/models/table_config.model';
import { ClientsService } from '../core/services/clients.service';
import { ModalActualizarComponent } from '../shared/modal-actualizar/modal-actualizar.component';
import { ModalBorrarComponent } from '../shared/modal-borrar/modal-borrar.component';
import { ModalRegistrarComponent } from '../shared/modal-registrar/modal-registrar.component';

const dataTable = [
  { columnDef: 'id', header: 'Nº Supplier' },
  { columnDef: 'document_id', header: 'Identificación' },
  { columnDef: 'name', header: 'Name' },
  { columnDef: 'acción', header: 'Acción' },
];

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  clients!: Client[];
  tableConfiguration!: tableConfig;

  constructor(
    private client_service: ClientsService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.client_service.getClients().subscribe({
      next: (rpta) => {
        this.clients = rpta['body'];

        this.tableConfig(this.clients);
      },
      error: (err) => {},
    });
  }

  ngOnChange() {}

  tableConfig(data: any) {
    this.tableConfiguration = {
      search: true,
      pagination: true,
      data: data,
      dataTable: dataTable,
    };
  }

  register(event: any) {
    const dialogRef = this.dialog.open(ModalRegistrarComponent, {
      width: '400px',
      disableClose: true,
      data: {
        campos: this.client_service.getQuestionsRegister(),
      },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.client_service.register(result).subscribe({
          next: (rpta) => {
            this.toastr.success('Registrado');
          },
          error: (err) => {
            console.log(err);
            this.toastr.error(err['error']['message'], 'Error');
          },
          complete: () => {},
        });
      }
    });
    
  }
}
