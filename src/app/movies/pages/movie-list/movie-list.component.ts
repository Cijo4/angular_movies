import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/movies/interfaces/movie-list.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  public movieList: Movie[] =[]
  

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe(resp => this.movieList= resp.results )
    this.movieService.getPopularMovies().subscribe(resp => console.log(resp))
     
  }

  getMovies() {
    this.movieService.getPopularMovies().subscribe(
      resp => console.log(resp)
    )
  }

  searchMovie(title:string){
    this.movieService.searchMovies('bla') //TODO
  }

}
