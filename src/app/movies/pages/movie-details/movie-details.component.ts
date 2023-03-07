import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Movie } from '../../interfaces/movie-list.interface';
import { MovieService } from '../../services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  movie!: Movie;
  public userRate: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private movieService: MovieService,
    private router: Router
  ) {}

  get isLogged(): boolean {
    return this.authService.isLogged();
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          return this.movieService.getMovieById(id);
        })
      )
      .subscribe({
        next: (movie) => (this.movie = movie),
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  rate() {
    console.log('rating');
  }

  addToFavourite() {

    if(!this.isLogged){
      this.router.navigate(['/auth/login']);
      return;
    }

    this.subscription = this.activatedRoute.params.subscribe(({ id }) => {
      const sessionId = JSON.parse(
        localStorage.getItem('session') ?? ''
      )?.session_id;
      this.movieService.markMovieAsFavourite(id, sessionId!).subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Added to Favourites!',
            icon: 'success',
          });
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'There was an error adding the movie to your favourites',
            icon: 'error',
          });
        },
      });
    });
  }
}
