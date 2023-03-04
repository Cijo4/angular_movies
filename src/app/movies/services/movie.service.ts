import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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

  // Create a request token
  getRequestToken(): Observable<any> {
    const url = `${this.url}/authentication/token/new?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getAuthorizationUrl(requestToken: string): string {
    return `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:4200`;
  }

  createAccessToken(username: string, password: string, requestToken: string): Observable<any> {
    const url = `${this.url}/authentication/token/validate_with_login?api_key=${this.apiKey}`;
    const body = { username, password, request_token: requestToken };
    return this.http.post(url, body);
  }

  createSession(accessToken: string): Observable<any> {
    const url = `${this.url}/authentication/session/new?api_key=${this.apiKey}`;
    const body = { request_token: accessToken };
    return this.http.post(url, body);
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.accessToken}` });
  }

}
