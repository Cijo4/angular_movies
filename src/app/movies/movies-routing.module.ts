import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteMoviesComponent } from './pages/favourite-movies/favourite-movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'movies',
        component: MovieListComponent
      },
      {
        path: 'movie-details',
        component: MovieDetailsComponent
      },
      {
        path: 'fovourites',
        component: FavouriteMoviesComponent
      },
      {
        path: '**',
        redirectTo: 'movies'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MoviesRoutingModule { }
