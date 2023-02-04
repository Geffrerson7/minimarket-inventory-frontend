import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  logo = environment.imagesPath + '/Logo.png'
  secciones = [
    {
      title: 'Dashboard',
      link:'/dashboard',
      icon: 'home'
    },
    {
      title:  'Inventory',
      link:'/inventory',
      icon:'inventory'
    },
    {
      title:'Reports',
      link:'/reports',
      icon:'analytics'
    },
    {
      title:'Suppliers',
      link: '/suppliers',
      icon:'account_circle'
    },
    {
      title:'Orders',
      link: '/orders',
      icon:'package'
    },
    {
      title:'Manage Store',
      link: '/manage-store',
      icon:'fact_check'
    }

  ]
  secciones2 = [
    {
      title:'Settings',
      icon:'settings'
    }
    ,
    {
      title:'Log Out',
      icon:'logout'
    }

  ]
  constructor() {

  }
logOut(){
  localStorage.clear();
  window.location.reload();
}
  ngOnInit(): void {

  }


}
