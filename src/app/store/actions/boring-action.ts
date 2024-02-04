import { createAction, props } from '@ngrx/store';
import { BoredActivity } from '../states/app-state';




export const addToNotes = createAction(
  '[Activity] Add To Notes',
  props<{ activity: BoredActivity }>()
);

export const fetchAddedData = createAction(
  '[Activity] Fetch Added Data'
);

export const fetchActivity = createAction('[Activity] Fetch Activity');
export const fetchActivitySuccess = createAction(
  '[Activity] Fetch Activity Success',
  props<{ response: BoredActivity }>() // Use BoredActivity type here
);
export const fetchActivityFailure = createAction(
  '[Activity] Fetch Activity Failure',
  props<{ error: any }>()
);

export const replaceAddedActivity = createAction(
  '[Activity] Replace Added Activity',
  props<{ data: BoredActivity[] }>()
);
export const removeItem = createAction(
  '[Activity] Remove Item',
  props<{ key: string }>()
);

export const BoringActions = {
  fetchActivity,
  fetchActivitySuccess,
  fetchActivityFailure,
  replaceAddedActivity,
  addToNotes,
  fetchAddedData,
  removeItem
};
