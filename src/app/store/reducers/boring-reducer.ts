import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { AppState, BoredActivity } from '../states/app-state';
import {
  BoringActions,
  addToNotes,
  fetchAddedData,
  removeItem,
  replaceAddedActivity,
} from '../actions/boring-action';

export const initialState: AppState = {
  boredActivity: null,
  added: [],
  error:''
};

export const activityReducer = createReducer(
  initialState,
  on(BoringActions.fetchActivitySuccess, (state, { response }) => ({
    ...state,
    boredActivity: response,
    error:''
  })),
  on(addToNotes, (state, { activity }) => {
    // Check if the key already exists in the added array
    const keyExists = state.added.some((item) => item.key === activity.key);

    // If the key does not exist, add the note to the added array
    if (!keyExists) {
      return {
        ...state,
        added: [...state.added, activity],
        error:''
      };
    } else {
      // If the key already exists, return the state with an error message
      const errorMessage = 'Note already exists!';
      return {
        ...state,
        error: errorMessage
      };
    }
  }),
  on(fetchAddedData, (state) => ({
    ...state,
    // Return the data from the 'added' property
    fetchedData: state.added,
    error:''
  })),
  on(replaceAddedActivity, (state, { data }) => ({
    ...state,
    added: data,
    error:''
  })),
  on(removeItem, (state, { key }) => ({
    ...state,
    added: state.added.filter(item => item.key !== key)
  }))
);
