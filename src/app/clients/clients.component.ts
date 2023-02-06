import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Client } from '../core/models/Client.model';
import { tableConfig } from '../core/models/table_config.model';
import { ClientsService } from '../core/services/clients.service';
import { ModalActualizarComponent } from '../shared/modal-actualizar/modal-actualizar.component';
import { ModalBorrarComponent } from '../shared/modal-borrar/modal-borrar.component';
import { ModalRegistrarComponent } from '../shared/modal-registrar/modal-registrar.component';

const dataTable = [
  { columnDef: 'id', header: 'Nº Client' },
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
  suscription!: Subscription;

  constructor(
    private client_service: ClientsService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.suscription = this.client_service.refresh$.subscribe(() => {
      this.getClients();
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

  getClients(): void {
    this.client_service.getClients().subscribe({
      next: (rpta) => {
        this.clients = rpta['body'];

        this.tableConfig(this.clients);
      },
      error: (err) => {},
    });
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
      if (result) {
        this.client_service.register(result).subscribe({
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

  update(client: any) {
    const dialogRef = this.dialog.open(ModalActualizarComponent, {
      width: '400px',
      disableClose: true,
      data: {
        campos: this.client_service.getUpdateFields(client),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== '') {
        this.client_service.update(client.id, result).subscribe({
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
