import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDrawer} from '@angular/material/sidenav';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() open: EventEmitter<any> = new EventEmitter();

  drawer!: MatDrawer

  @Input() nombres = '';
  @Input() name=''
  selectedRol= ''
  toggle() {
      this.open.emit(null);
  }

  constructor() { }

  ngOnInit(): void {


  }
}
