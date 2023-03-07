import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieList } from '../../interfaces/movie-list.interface';
import { MovieService } from '../../services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrls: ['./favourite-movies.component.scss'],
})
export class FavouriteMoviesComponent implements OnInit, OnDestroy {
  public movieList!: MovieList;
  private subscription!: Subscription;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    const sessionId = JSON.parse(
      localStorage.getItem('session') ?? ''
    )?.session_id;
    this.subscription = this.movieService
      .getFavoriteMovies(sessionId)
      .subscribe({
        next: (movies) => (this.movieList = movies),
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'There was an error retrieving your favorite movies.',
            icon: 'error',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
