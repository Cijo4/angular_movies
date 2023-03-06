import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavRoutes } from '../../interfaces/routes.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public routes: NavRoutes[] = [
    {
      name: 'Movies',
      route: '',
    },
    {
      name: 'Favs',
      route: 'favourites',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get isLogged(): boolean {
    return this.authService.isLogged();
  }

  login(): void {
    this.router.navigate(['auth', 'login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }

  logout(): void {
    this.authService.logout();
    this.login();
  }
}
