import { TestBed } from '@angular/core/testing';
import { MovieDTOJson } from '../models';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  it('Should not allow empty json rows', (end) => {
    const mockJson: MovieDTOJson = {
      data: [{ genre: '', movie_title: 'test', release_date: 'test-date' }],
    };

    const service = new MoviesService(mockJson);

    service.movies$.subscribe((movies) => {
      expect(movies.length).toEqual(0);
      end();
    });
  });

  it('Should not allow not declared properties from dto to pass through components', (end) => {
    const mockJson: MovieDTOJson = {
      data: [
        {
          genre: 'test',
          movie_title: 'test',
          release_date: 'test-date',
          mpaa_rating: 'test',
        },
      ],
    };

    const service = new MoviesService(mockJson);

    service.movies$.subscribe((movies) => {
      const movie: any = movies[0];
      expect(movie.mpaa_rating).toBeUndefined();
      end();
    });
  });
});
