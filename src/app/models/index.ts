export type MovieDTO = {
  movie_title: string;
  release_date: string;
  genre: string;
  mpaa_rating: string;
  total_gross: string;
  inflation_adjusted_gross: string;
};

export abstract class MovieDTOJson {
  data: Partial<MovieDTO>[];
}

export type Movie = {
  movie_title: string;
  release_date: string;
  genre: string;
};
