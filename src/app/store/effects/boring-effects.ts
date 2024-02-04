import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BoringActions } from '../actions/boring-action';
import { BoredActivity } from '../states/app-state';

@Injectable()
export class ActivityEffects {
  boredActivityAPIUrl = 'https://www.boredapi.com/api/activity';
  fetchActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoringActions.fetchActivity),
      switchMap(() =>
        this.http.get<BoredActivity>(this.boredActivityAPIUrl).pipe(
          tap((response: BoredActivity) =>
            console.log('API response:', response)
          ),
          map((response) => BoringActions.fetchActivitySuccess({ response })),
          catchError((error) => {
            console.error('API Error:', error); // Log the error
            return of(BoringActions.fetchActivityFailure({ error }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
