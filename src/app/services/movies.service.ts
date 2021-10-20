import { MovieDTO, Movie, MovieDTOJson } from './../models/index';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies$ = this.getMovies();

  constructor(private moviesDataDto: MovieDTOJson) {}

  private getMovies(): Observable<Movie[]> {
    return of(this.moviesDataDto.data).pipe(map(this.parseMovies.bind(this)));
  }

  private parseMovies(movies: unknown[]) {
    return movies.flatMap((movie) => {
      return this.validateMovie(movie)
        ? this.deleteUnusedProperties(movie)
        : [];
    });
  }

  private validateMovie(movie: any): movie is Movie {
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

  private deleteUnusedProperties(movie: Movie) {
    const usedKyes: (keyof Movie)[] = ['genre', 'movie_title', 'release_date'];
    const entries = Object.entries(movie);

    const filteredEntries = entries.filter(([key]) =>
      usedKyes.includes(key as keyof Movie)
    );

    return Object.fromEntries(filteredEntries) as Movie;
  }
}
