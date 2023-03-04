import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../interfaces/movie-list.interface';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movieId!: number
  movie!: Movie

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.movieId=id)
    this.movieService.getMovieById(this.movieId+'').subscribe(resp => this.movie=resp)
  }



}
