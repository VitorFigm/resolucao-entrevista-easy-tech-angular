import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Movie, MovieDTO } from './models';
import { MoviesService } from './services/movies.service';

import { Header } from './components/table/table.component';
import { Observable } from 'rxjs';

type Key = keyof Partial<Movie>;
type KeyMap = { [key in Key]: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'resolucao-easy-tech';

  view: 'table' | 'landing' = 'landing';

  keyToLabelMap: KeyMap = {
    movie_title: 'Title',
    genre: 'Genre',
    release_date: 'Release Date',
  };

  tableHeaders$ = this.getTableHeaders();

  constructor(public moviesService: MoviesService) {}

  getTableHeaders(): Observable<Header<Movie>[]> {
    const parseMovie = (movies: Movie[]) => {
      const keys = Object.keys(movies[0]) as Key[];

      return keys.map((key) => {
        return {
          title: this.keyToLabelMap[key],
          keyName: key,
        };
      });
    };

    return this.moviesService.movies$.pipe(map(parseMovie));
  }

  changeView() {
    switch (this.view) {
      case 'landing':
        this.view = 'table';
        break;
      case 'table':
        this.view = 'landing';
        break;
    }
  }
}
