import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { FavouriteMoviesComponent } from './pages/favourite-movies/favourite-movies.component';
import { PosterImagePipe } from './pipes/poster-image.pipe';
import { FormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './movies-routing.module';



@NgModule({
  declarations: [
    MovieDetailsComponent,
    MovieListComponent,
    FavouriteMoviesComponent,
    PosterImagePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
