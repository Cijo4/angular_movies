import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionIdResponse, ResponseToken } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private apiKey: string = environment.apiKey;
  private url: string = environment.apiUrl;
  private loginData?: ResponseToken;
  private readonly localStorageKey: string = 'loginData';
  private sessionId?: SessionIdResponse;
  private readonly localStorageKeySession: string = 'session';

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
            this.getSessionId(this.loginData.request_token).subscribe(
              (sessionId) => {
                this.sessionId = sessionId;
                localStorage.setItem(
                  this.localStorageKeySession,
                  JSON.stringify(sessionId)
                );
              }
            );
          },
        })
      );
  }

  getSessionId(requestToken: string): Observable<SessionIdResponse> {
    const body = {
      request_token: requestToken,
    };
    const params: Params = {
      api_key: this.apiKey,
    };

    return this.http.post<SessionIdResponse>(
      this.url + '/authentication/session/new',
      body,
      { params }
    );
  }

  isLogged(): boolean {
    const now = new Date();
    return (
      Boolean(this.loginData) &&
      new Date(this.loginData?.expires_at || '') > now
    );
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem(this.localStorageKeySession);
    this.loginData = undefined;
    this.sessionId = undefined;
  }

  ngOnInit(): void {
    const lsLogin = localStorage.getItem(this.localStorageKey);
    const lsSessionId = localStorage.getItem(this.localStorageKeySession);
    if (lsLogin) {
      const login: ResponseToken = JSON.parse(lsLogin);
      const session: SessionIdResponse = JSON.parse(lsSessionId!);
      if (login.expires_at && new Date(login.expires_at) > new Date()) {
        this.loginData = login;
        this.sessionId = session;
      }
    }
  }
}
