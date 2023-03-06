import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/movie-list.interface';

@Component({
  selector: 'app-movie-container',
  templateUrl: './movie-container.component.html',
  styleUrls: ['./movie-container.component.scss'],
})
export class MovieContainerComponent {
  @Input() movies: Movie[] = [];
}
