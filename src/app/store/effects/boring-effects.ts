import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  BoringActions,
  addToNotes,
  fetchActivity,
  fetchAddedData,
  removeItem,
} from '../actions/boring-action';
import { AppState, BoredActivity } from '../states/app-state';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';

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

  openSnackbar(message: string, customClass: string) {
    const config: MatSnackBarConfig = {
      duration: 5000,
      panelClass: [customClass], // Apply custom CSS class
    };
    this.snackBar.open(message, 'Dismiss', config);
  }

  addToNotesSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToNotes, fetchActivity), 
        withLatestFrom(this.store.pipe(select((state: any) => state))), 
        tap(([action, state]) => {
          const message = state.boredActivity.message;
          if (message === '') {
            this.openSnackbar('Note added to ideas', 'basic');
          } else if (message) {
            this.openSnackbar(message, 'error');
          }
        })
      ),
    { dispatch: false }
  );


  fetchActivitySnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchActivity),
        tap(() => this.openSnackbar('Fetching activity...', 'basic'))
      ),
    { dispatch: false }
  );

  
  fetchAddedSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchAddedData),
        tap(() => this.openSnackbar('added data', 'basic'))
      ),
    { dispatch: false }
  );

  removeItemSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeItem),
        tap(() => this.openSnackbar('Removed from notes!', 'basic'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {}
}
