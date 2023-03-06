import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieList } from '../interfaces/movie-list.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = environment.apiKey;
  private url = environment.apiUrl;
  private accessToken!: string;

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<MovieList> {
    return this.http.get<MovieList>(`${this.url}/movie/popular?api_key=${this.apiKey}`);
  };

  searchMovies(query: string, page: number = 1): Observable<MovieList> {
    const params = {
      page,
      query,
      api_key: this.apiKey
    };

    return this.http.get<MovieList>(
      `${this.url}/search/movie`,
      { params }
    )
  };

  getMovieById(movieId: string): Observable<any> {
    const url = `${this.url}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get(url).pipe(
      catchError((err) => {
        console.error(err);
        return throwError('Error getting movie details');
      })
    );
  }

  createGuestSession(): Observable<any> {
    const url = `${this.url}/authentication/guest_session/new?api_key=${this.apiKey}`;
    return this.http.get(url);
  }


  getRequestToken(): Observable<any> {
    const url = `${this.url}/authentication/token/new?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getAuthorizationUrl(requestToken: string, redirectUrl: string): string {
    return `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`;
  }

  createSession(requestToken: string): Observable<any> {
    const url = `${this.url}/authentication/session/new?api_key=${this.apiKey}`;
    const body = { request_token: requestToken };
    return this.http.post(url, body);
  }


  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  validateTokenWithLogin(username: string, password: string, requestToken: string): Observable<any> {
    const url = `${this.url}/authentication/token/validate_with_login?api_key=${this.apiKey}`;
    const body = { username, password, request_token: requestToken };
    return this.http.post(url, body);
  }


  login(username: string, password: string) {
    const queryParams: Params = {
      apy_key: this.apiKey
    }

    return this.http.get<any>(this.url + '/authentication/token/new?', { params: queryParams }).pipe(
      switchMap(({ request_token }) => {
        const body = {
          username,
          password,
          request_token

        };
        return this.http.post<any>(this.url+ '/authentication/token/validate_with_login', body, { params: queryParams })
      }))
  }



}
