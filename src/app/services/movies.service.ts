import { Movie } from './../models/index';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import moviesData from '../data/kaggle-disney-movies.json';

type MovieDTO = Partial<Movie> | undefined;
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies$: Observable<MovieDTO[]> = this.getMovies();

  constructor() {}

  private getMovies(): Observable<Movie[]> {
    return of(moviesData).pipe(
      map((movies) => movies.filter(this.validateMovie.bind(this)))
    );
  }

  private validateMovie(movie: MovieDTO): movie is Movie {
    console.log(typeof movie?.genre === 'string');

    return (
      Boolean(movie) &&
      Boolean(movie?.movie_title) &&
      typeof movie?.movie_title === 'string' &&
      Boolean(movie?.genre) &&
      typeof movie?.genre === 'string' &&
      Boolean(movie?.release_date) &&
      typeof movie?.release_date === 'string'
    );
  }
}
