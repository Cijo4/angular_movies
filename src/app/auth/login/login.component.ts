import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseToken } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;
  error: boolean = false;
  token!: ResponseToken;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (resp) => {
        this.token = resp;
        localStorage.setItem('loginData', JSON.stringify(resp));
        console.log('Token', this.token);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      (err) => {
        this.error = true;
        console.log('Error:', err);
      }
    );
  }
}
