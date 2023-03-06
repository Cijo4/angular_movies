import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/movies/services/movie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  requestToken!: string;
  authUrl!: string;
  errorMessage!: string;
  redirectUrl = 'http://localhost:4200/auth/login';

  approved:boolean=false;

  constructor(private authService: MovieService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.requestToken= params['request_token']
      this.approved = params['approved']
    });

  }

  ngOnInit(): void {}

  getRequestToken() {
    this.authService.getRequestToken().subscribe(
      response => {
        this.requestToken = response.request_token;
        this.authUrl = this.authService.getAuthorizationUrl(this.requestToken, this.redirectUrl);
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }

  createSession(requestToken: string) {
    this.authService.createSession(requestToken).subscribe(
      response => {
        this.authService.setAccessToken(response.session_id);
        // redirect to main page or do something else
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }

  login(){

    console.log(this.username, this.password, this.requestToken);
    

    this.authService.login(this.username, this.password).subscribe(resp=> console.log(resp))
  }


  
}
