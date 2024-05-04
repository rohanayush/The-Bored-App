import { createReducer, on } from '@ngrx/store';
import { AppState } from '../states/app-state';
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
  message: '',
};

export const activityReducer = createReducer(
  initialState,
  on(BoringActions.fetchActivitySuccess, (state, { response }) => ({
    ...state,
    boredActivity: response,
    message: '',
  })),
  on(addToNotes, (state, { activity }) => {
    const keyExists = state.added.some((item) => item.key === activity.key);

    if (!keyExists) {
      return {
        ...state,
        added: [...state.added, activity],
        message: '',
      };
    } else {
      const errorMessage = 'Note already exists!';
      return {
        ...state,
        message: errorMessage,
      };
    }
  }),
  on(fetchAddedData, (state) => ({
    ...state,
    fetchedData: state.added,
    message: '',
  })),
  on(replaceAddedActivity, (state, { data }) => ({
    ...state,
    added: data,
    message: '',
  })),
  on(removeItem, (state, { key }) => ({
    ...state,
    added: state.added.filter((item) => item.key !== key),
  }))
);
