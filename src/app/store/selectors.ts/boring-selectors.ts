import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, BoredActivity } from '../states/app-state';
import { fetchAddedData } from '../actions/boring-action';

// Select the entire feature state
export const selectBoringActivity = createFeatureSelector<AppState>('boredActivity');
// export const addedActivity = createFeatureSelector<AppState>('added');

// Select the boredActivity property from the feature state
export const selectBoredActivity = createSelector(
  selectBoringActivity,
  (state: AppState) => state.boredActivity
);

export const fetchAddedActivity = createSelector(
    selectBoringActivity,
    (state: AppState) => state.added
  );

// for error
// export const addActivityNote = createFeatureSelector<AppState>('added');
export const selectError = createSelector(
    selectBoringActivity,
    (state: AppState) => state.error
  );

  export const selectAddedItems = createSelector(
    selectBoringActivity,
    state => state.added
  );
