import { Movie } from './../models/index';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import moviesData from '../data/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies$ = of(moviesData);
  constructor() {}
}
