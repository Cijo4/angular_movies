import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseToken } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private apiKey: string = environment.apiKey;
  private url: string = environment.apiUrl;
  private loginData?: ResponseToken;
  private readonly localStorageKey: string = 'loginData';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<ResponseToken> {
    const params: Params = {
      api_key: this.apiKey,
    };

    return this.http
      .get<ResponseToken>(this.url + '/authentication/token/new', { params })
      .pipe(
        switchMap(({ request_token }) => {
          const body = {
            username,
            password,
            request_token,
          };
          return this.http.post<ResponseToken>(
            this.url + '/authentication/token/validate_with_login',
            body,
            { params }
          );
        }),
        tap({
          next: (loginData) => {
            this.loginData = loginData;
            localStorage.setItem(
              this.localStorageKey,
              JSON.stringify(loginData)
            );
          },
        })
      );
  }

  isLogged(): boolean {
    const now = new Date();
    return Boolean(this.loginData) && new Date(this.loginData?.expires_at || '') > now;
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    this.loginData = undefined;
  }

  ngOnInit(): void {
    const lsLogin = localStorage.getItem(this.localStorageKey);
    if (lsLogin) {
      const login: ResponseToken = JSON.parse(lsLogin);
      if (login.expires_at && new Date(login.expires_at) > new Date()) {
        this.loginData = login;
      }
    }
  }
}
