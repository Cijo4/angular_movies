import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { FavouriteMoviesComponent } from './pages/favourite-movies/favourite-movies.component';
import { PosterImagePipe } from './pipes/poster-image.pipe';
import { FormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './movies-routing.module';
import { RootPageComponent } from './pages/root-page/root-page.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieContainerComponent } from './components/movie-container/movie-container.component';



@NgModule({
  declarations: [
    MovieDetailsComponent,
    MovieListComponent,
    FavouriteMoviesComponent,
    PosterImagePipe,
    RootPageComponent,
    MovieCardComponent,
    MovieContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    MoviesRoutingModule,
  ]
})
export class MoviesModule { }
