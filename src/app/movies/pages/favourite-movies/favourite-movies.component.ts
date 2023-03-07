import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieList } from '../../interfaces/movie-list.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrls: ['./favourite-movies.component.scss']
})
export class FavouriteMoviesComponent implements OnInit, OnDestroy {
  public movieList!: MovieList;
  private subscription!: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    const sessionId = JSON.parse(localStorage.getItem('session') ?? '')?.session_id;
    this.subscription = this.movieService.getFavoriteMovies(sessionId).subscribe(movies => this.movieList= movies)
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
