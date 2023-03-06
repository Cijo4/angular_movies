import { Component, EventEmitter, Output } from '@angular/core';
import { NavRoutes } from '../../interfaces/routes.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

 routes: NavRoutes[]=[
    {
      name: 'Movies',
      route: ''
    },
    {
      name:'Favs',
      route: '/favourites'
    }
 ]

}
