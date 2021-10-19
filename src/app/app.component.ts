import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Movie, MovieDTO } from './models';
import { MoviesService } from './services/movies.service';

import { Header } from './components/table/table.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'resolucao-easy-tech';

  tableHeaders$: Observable<Header<Movie>[]> = this.getTableHeaders();

  constructor(public moviesService: MoviesService) {}

  getTableHeaders() {
    type Key = keyof Partial<Movie>;
    type KeyMap = { [key in Key]: string };

    const parseMovie = (movies: Movie[]) => {
      const map: KeyMap = {
        movie_title: 'Title',
        genre: 'Genre',
        release_date: 'Release Date',
      };

      const keys = Object.keys(movies[0]) as Key[];

      return keys.map((key) => {
        return {
          title: map[key],
          keyName: key,
        };
      });
    };

    return this.moviesService.movies$.pipe(map(parseMovie));
  }
}
