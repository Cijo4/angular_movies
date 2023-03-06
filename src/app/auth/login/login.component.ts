import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  tokensito!:string;

  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  login() {
    this.subscription = this.authService
      .login(this.username, this.password)
      .subscribe(
        (resp) => {
          this.token = resp;
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        (err) => {
          this.error = true;
          console.log('Error:', err);
        }
      );
  }

  session(){
    const loginData = JSON.parse(localStorage.getItem('loginData') || '');
    console.log(loginData['request_token']);  

    this.authService.getSessionId(loginData['request_token']).subscribe(console.log)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
