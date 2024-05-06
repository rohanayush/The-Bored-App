import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../states/app-state';

// Select the entire feature state
export const selectBoringActivity =
  createFeatureSelector<AppState>('boredActivity');

// Select the boredActivity property from the state
// .ie, the recently added/fetched idea/activity
export const selectBoredActivity = createSelector(
  selectBoringActivity,
  (state: AppState) => state.boredActivity
);

// To just get the values from added property in state
export const fetchAddedActivity = createSelector(
  selectBoringActivity,
  (state: AppState) => state.added
);

// for error , ie, to get value of message from state
export const selectError = createSelector(
  selectBoringActivity,
  (state: AppState) => state.message
);
