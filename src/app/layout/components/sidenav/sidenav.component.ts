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
      title:'Category',
      link: '/categories',
      icon:'fact_check'
    },
    {
      title:  'Products',
      link:'/products',
      icon:'inventory'
    },
    {
      title:'Clients',
      link: '/clients',
      icon:'assignment_ind'

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
