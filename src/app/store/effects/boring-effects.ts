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
import { FetchActivitiesService } from '../../services/fetch-activities.service';

@Injectable()
export class ActivityEffects {

  // For calling the api (so called side effects) and dispatching an action for 
  // success or failure
  fetchActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoringActions.fetchActivity),
      switchMap(() =>
        this.fetchActivityService.fetchActivities().pipe(

          // tap is used to just check some data or do some operation,
          // it does not alter the main data
          tap((response: BoredActivity) =>
            console.log('API response:', response)
          ),

          // Gets the response from api and communicates back to action of type fetchActivitySuccess
          // with response as prop or value, 
          //which then will be listened by reducers waiting for fetchActivitySuccess
          map((response) => BoringActions.fetchActivitySuccess({ response })),


          catchError((error) => {
            console.error('API Error:', error); // Log the error
            // communicates back to action of type fetchActivityFailure
            // with error as prop value
            return of(BoringActions.fetchActivityFailure({ error }));
          })
        )
      )
    )
  );

  // Custom method to call the Angular Material Snackbar library with a message
  openSnackbar(message: string, customClass: string) {
    const config: MatSnackBarConfig = {
      duration: 5000,
      panelClass: [customClass], // Apply custom CSS class
    };
    this.snackBar.open(message, 'Dismiss', config);
  }

  // effect to listen when we are adding an idea as note
  /**
   * It listens to addToNotes action and shows notification whether 
   * a new note was added, OR...
   * The note already exists
   */
  addToNotesSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToNotes), 
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


  // For showing notification when an idea is being fetched
  fetchActivitySnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        // listening to when action of type 'fetchActivity' is dispatched
        ofType(fetchActivity),

        // using tap to just call the custom function for notifications
        tap(() => this.openSnackbar('Fetching activity...', 'basic'))
      ),
    { dispatch: false }
  );

  // this effect is for showing confirmation that idea
  // has been added as notes
  fetchAddedSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchAddedData),
        tap(() => this.openSnackbar('added data', 'basic'))
      ),
    { dispatch: false }
  );

  // notification when some note is removed
  removeItemSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeItem),
        tap(() => this.openSnackbar('Removed from notes!', 'basic'))
      ),
    { dispatch: false }
  );

  constructor(
    // instance of Action Service
    //that is provided by NgRx that allows 
    // us to listen to actions that are dispatched
    // in the NgRx store.
    private actions$: Actions,

    // for angular material snackbar library
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private fetchActivityService:FetchActivitiesService
  ) {}
}
