import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Movie } from '../../interfaces/movie-list.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  movie!: Movie
  public userRate: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private movieService: MovieService
  ) { }

  get isLogged(): boolean {
    return this.authService.isLogged();
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.pipe(switchMap(({id}) => {
      return this.movieService.getMovieById(id)
    })).subscribe({ 
      next: movie => this.movie = movie,
      error: () => { console.log('error') } // TODO: Poner algun error
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  rate() {
    console.log('rating');
  }

  addToFavourite(){
     this.subscription = this.activatedRoute.params.subscribe(({id})=>{
      const lsSession = localStorage.getItem('session');
      const sessionId = JSON.parse(lsSession!)
      const idtoken = sessionId ['session_id']
      console.log(idtoken)
      return this.movieService.markMovieAsFavourite(id, idtoken!).subscribe(resp=> console.log(resp))
     })
  }

}
