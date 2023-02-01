import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor() { }

  ngOnInit(): void {


  }
  openSidenav(drawer: MatDrawer)
  {
    return drawer.toggle()
  }
}
