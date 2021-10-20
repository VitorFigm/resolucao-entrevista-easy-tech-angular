import { defer, from, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

const _lazyLoadedData$ = new Observable((subscriber) => {
  import('./kaggle-disney-movies.json').then((jsonModule) => {
    const data = Array.from(jsonModule);

    subscriber.next(data);
  });
});

export const lazyLoadedData$ = _lazyLoadedData$.pipe(shareReplay());
