import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieList } from '../interfaces/movie-list.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = environment.apiKey;
  private url = environment.apiUrl;

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

}
