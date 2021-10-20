import { Component, Input, Output } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { EventEmitter } from '@angular/core';

import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { Movie } from './models';
import { MoviesService } from './services/movies.service';
import { Header, TableComponent } from './components/table/table.component';

describe('AppComponent', () => {
  let mockMoviesService: Partial<MoviesService>;
  let mockLandingPageComponent: Partial<LandingPageComponent>;
  let mockTableComponent: Partial<TableComponent<Movie>>;

  let mockMovies: Movie[] = [
    { genre: 'test', movie_title: 'testing', release_date: 'test' },
  ];

  beforeEach(async () => {
    @Component({
      selector: 'app-landing-page',
    })
    class MockLandingPage {
      @Output() clickButton = new EventEmitter();
    }
    @Component({
      selector: 'app-header',
    })
    class MockTable {
      @Input() headers: Header<Movie>[];
    }

    @Component({
      selector: 'app-header',
    })
    class MockHeader {}

    mockLandingPageComponent = new MockLandingPage();
    mockTableComponent = new MockTable();

    mockMoviesService = { movies$: of(mockMovies) };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockHeader],
      providers: [
        { provide: MockLandingPage, useValue: mockLandingPageComponent },
        { provide: MockTable, useValue: mockTableComponent },
        { provide: MoviesService, useValue: mockMoviesService },
      ],
    }).compileComponents();
  });

  it('should pass the the right headers to the table', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.debugElement.nativeElement;

    app.tableHeaders$.subscribe((value) => {
      const expected = [
        { keyName: 'movie_title', title: 'Title' },
        { keyName: 'genre', title: 'Genre' },
        { keyName: 'release_date', title: 'Release Date' },
      ] as Header<Movie>[];

      const currentValue = value;

      expect(currentValue).toEqual(jasmine.arrayContaining(expected));
    });
  });
});
