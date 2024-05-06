import { createAction, props } from '@ngrx/store';
import { BoredActivity } from '../states/app-state';

// when an idea is added
export const addToNotes = createAction(
  '[Activity] Add To Notes',
  props<{ activity: BoredActivity }>()
);

// To get all the data under added key in the store 
export const fetchAddedData = createAction(
  '[Activity] Fetch Added Data'
);

// When api is called
export const fetchActivity = createAction('[Activity] Fetch Activity');

// When effects communicates back with a response as prop, 
// which is then listened by reducer
export const fetchActivitySuccess = createAction(
  '[Activity] Fetch Activity Success',
  props<{ response: BoredActivity }>() // Use BoredActivity type here
);

// In case of failure with API call, this action is called by effects
export const fetchActivityFailure = createAction(
  '[Activity] Fetch Activity Failure',
  props<{ error: any }>()
);

// This action is used to populate the store's added key,
// from the local Storage at start, if there is any notes in local storage 
export const replaceAddedActivity = createAction(
  '[Activity] Replace Added Activity',
  props<{ data: BoredActivity[] }>()
);

// for removing ideas from notes
export const removeItem = createAction(
  '[Activity] Remove Item',
  props<{ key: string }>()
);

// exporting so that other ts classes can use these actions and call/dispatch them
export const BoringActions = {
  fetchActivity,
  fetchActivitySuccess,
  fetchActivityFailure,
  replaceAddedActivity,
  addToNotes,
  fetchAddedData,
  removeItem
};
