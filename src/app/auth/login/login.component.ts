import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/movies/services/movie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private authService: MovieService) {}

  ngOnInit(): void {
  }


  login() {
    this.authService.getRequestToken().subscribe(
      (data) => {
        const requestToken = data.request_token;
        this.authService.createAccessToken(this.username, this.password, requestToken).subscribe(
          (data) => {
            const accessToken = data.request_token;
            this.authService.createSession(accessToken).subscribe(
              (data) => {
                const sessionId = data.session_id;
                this.authService.setAccessToken(sessionId);
                console.log('Sesión iniciada con éxito');
              },
              (error) => {
                console.error('Error al crear la sesión', error);
              }
            );
          },
          (error) => {
            console.error('Error al crear el token de acceso', error);
          }
        );
      },
      (error) => {
        console.error('Error al crear el token de solicitud', error);
      }
    );
  }

}
