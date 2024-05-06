import { createReducer, on } from '@ngrx/store';
import { AppState } from '../states/app-state';
import {
  BoringActions,
  addToNotes,
  fetchAddedData,
  removeItem,
  replaceAddedActivity,
} from '../actions/boring-action';

// An initial state is required for modification in an immutable fashion
export const initialState: AppState = {
  boredActivity: null,
  added: [],
  message: '',
};


export const activityReducer = createReducer(
  initialState,

  // Line below listens to 'fetchActivitySuccess'
  // that has been called by effects 
  // with response as arguments/prop 
  // that prop is used here to change the state in store  
  on(BoringActions.fetchActivitySuccess, (state, { response }) => ({
    ...state,
    // So here boredActivity from initial state and later state is populated with response 
    // that was received from effects
    boredActivity: response,

    // Message is set to nothing as it is success
    // default message is provided in effects
    message: '',
  })),

  // When we tap add to notes , this action is dispatched with current idea/activity
  on(addToNotes, (state, { activity }) => {

    // We use some function from Javascript
    // to get if even one item key matches key of activity that we want to add
    // keyExists is true if new activity id is already there in added
    const keyExists = state.added.some((item) => item.key === activity.key);

    if (!keyExists) {
      return {
        ...state,
        added: [...state.added, activity],
        message: '',
      };
    } 
    // error message block, if activity akready exists!
    else {
      const errorMessage = 'Note already exists!';
      return {
        ...state,
        message: errorMessage,
      };
    }
  }),

  // to fetch already stored state.added
  on(fetchAddedData, (state) => ({
    ...state,
    fetchedData: state.added,
    message: '',
  })),


  // replace from data from local storage at start for the added key
  on(replaceAddedActivity, (state, { data }) => ({
    ...state,
    added: data,
    message: '',
  })),

  // for removing an item from the state
  on(removeItem, (state, { key }) => ({
    ...state,
    // it returns an array of objects for which key argument not matches
    added: state.added.filter((item) => item.key !== key),
  }))
);
