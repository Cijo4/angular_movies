import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FavouriteMoviesComponent } from './pages/favourite-movies/favourite-movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { RootPageComponent } from './pages/root-page/root-page.component';

const routes: Routes = [
  {
    path: '',
    component: RootPageComponent,
    children: [
      {
        path: '',
        component: MovieListComponent
      },
      {
        path: 'favourites',
        component: FavouriteMoviesComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'movie-details/:id',
        component: MovieDetailsComponent
      },
      {
        path: '**',
        redirectTo: '/404'
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
