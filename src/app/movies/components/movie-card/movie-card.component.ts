import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/movie-list.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styles: [
  ]
})
export class MovieCardComponent {
  @Input() movie!: Movie;
}
