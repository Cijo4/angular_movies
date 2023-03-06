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

  getPopularMovies(page: number = 1): Observable<MovieList> {
    const params: Params = {
      api_key: this.apiKey,
      page
    }
    return this.http.get<MovieList>(`${this.url}/movie/popular`, { params });
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
    const params: Params = {
      api_key: this.apiKey
    }


    const url = `${this.url}/movie/${movieId}`;
    return this.http.get(url, { params }).pipe(
      catchError((err) => {
        console.error(err);
        return throwError('Error getting movie details');
      })
    );
  }

  


}
