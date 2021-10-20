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

  tableHeaders: Header<Movie>[] = [
    { keyName: 'movie_title', title: 'Title' },
    { keyName: 'genre', title: 'Genre' },
    { keyName: 'release_date', title: 'Release Date' },
  ];

  constructor(public moviesService: MoviesService) {}

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
