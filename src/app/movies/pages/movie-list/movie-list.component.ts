import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import {
  Movie,
  MovieList,
} from 'src/app/movies/interfaces/movie-list.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  public movieList!: MovieList;
  public query: string = '';
  public readonly pageSize: number = 1;

  private subscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams
      .pipe(
        switchMap(({ query, page }) => {
          if (query) {
            return this.movieService.searchMovies(query, page);
          } else {
            return this.movieService.getPopularMovies(page);
          }
        })
      )
      .subscribe({
        next: (paginatedMovies) => (this.movieList = paginatedMovies),
        error: () => console.log('Error'), // TODO: Change error handling
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  changePage(page: number): void {
    const queryParams: Params = { page };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  getMaxCollectionSize(pages: number) {
    return pages > 500 ? 500 : pages
  }

  searchMovie(): void {
    const queryParams = {
      query: this.query,
    };

    this.router.navigate(['/'], { queryParams });
  }
}
