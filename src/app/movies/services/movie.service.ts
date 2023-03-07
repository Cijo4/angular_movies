import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieList, Movie } from '../interfaces/movie-list.interface';
import { UserDetails } from '../../auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = environment.apiKey;
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<MovieList> {
    const params: Params = {
      api_key: this.apiKey,
      page,
    };
    return this.http.get<MovieList>(`${this.url}/movie/popular`, { params });
  }

  searchMovies(query: string, page: number = 1): Observable<MovieList> {
    const params = {
      page,
      query,
      api_key: this.apiKey,
    };

    return this.http.get<MovieList>(`${this.url}/search/movie`, { params });
  }

  getMovieById(movieId: string): Observable<any> {
    const params: Params = {
      api_key: this.apiKey,
    };

    const url = `${this.url}/movie/${movieId}`;
    return this.http.get(url, { params }).pipe(
      catchError((err) => {
        return throwError('Error getting movie details');
      })
    );
  }

  markMovieAsFavourite(movieId: string, session_id: string): Observable<Movie> {
    const params: Params = {
      api_key: this.apiKey,
      session_id,
    };

    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    };

    return this.http.get<any>(this.url + '/account', { params }).pipe(
      switchMap(({ id }) => {
        const userId = id;
        return this.http.post<Movie>(
          this.url + '/account/' + userId + '/favorite',
          body,
          { params }
        );
      })
    );
  }

  getFavoriteMovies(session_id: string): Observable<MovieList> {
    const params: Params = {
      api_key: this.apiKey,
      session_id,
    };
    return this.http.get<any>(this.url + '/account', { params }).pipe(
      switchMap(({ id }) => {
        const userId = id;
        return this.http.get<MovieList>(
          this.url + '/account/' + userId + '/favorite/movies',
          { params }
        );
      })
    );
  }
}
