import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tableConfig } from 'src/app/core/models/table_config.model';

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss'],
})
export class TableBasicComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() configuration!: tableConfig;
  @Output() registerEvent = new EventEmitter<Event>();
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  @Input() borrar!: Boolean;
  @Input() actualizar!: Boolean;
  dataSource: any;
  displayedColumns: any;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.configuration?.data);

    this.displayedColumns = this.configuration?.dataTable.map(
      (x: any) => x.columnDef
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  registrar(event: Event) {
    this.registerEvent.emit(event);
  }

  edit(element: string) {
    this.editEvent.emit(element);
  }
  delete(element: string) {
    this.deleteEvent.emit(element);
  }
}
