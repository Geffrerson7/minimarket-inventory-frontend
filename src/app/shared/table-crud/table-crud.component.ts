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
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableCrudComponent implements AfterViewInit, OnChanges {
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
  columnsToDisplayWithExpand!:any;
  expandedElement: any | null;
  constructor(private _liveAnnouncer: LiveAnnouncer) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.configuration?.data);
    this.displayedColumns = this.configuration?.dataTable.map(
      (x: any) => x.columnDef
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
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

  edit(element:string) {
    this.editEvent.emit(element);
  }
  delete(element:string) {
    this.deleteEvent.emit(element);
  }
  convert(data: any){
    return data.map((element: any)=>element);
  }
}
