import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BoredActivity, AppState } from '../../store/states/app-state';
import {
  selectBoredActivity,
  selectError,
} from '../../store/selectors.ts/boring-selectors';
import {
  BoringActions,
  addToNotes,
  fetchActivity,
} from '../../store/actions/boring-action';

@Component({
  selector: 'app-participant-dialog',
  templateUrl: './participant-dialog.component.html',
  styleUrl: './participant-dialog.component.scss',
})
export class ParticipantDialogComponent {
  numberOfParticipants: number | undefined;
  toggle: boolean = false;
  boredActivity$: Observable<BoredActivity | null>; // Define observable for selected state
  error$: Observable<string | null> | undefined;

  ngOnInit(): void {
    // fetchActivity action followed by (),  is dispatched so that api can be called
    this.store.dispatch(fetchActivity());

    // Access the selector for any erro messages
    this.error$ = this.store.pipe(select(selectError));
  }

  constructor(
    public dialogRef: MatDialogRef<ParticipantDialogComponent>,
    private store: Store<AppState>
  ) {
    // getting the recently fetched activity json inside stream/observable
    this.boredActivity$ = this.store.pipe(select(selectBoredActivity));
  }

  // for adding to added property in state
  addToNotes(boredActivity: BoredActivity) {
    console.log('added an Activity', boredActivity);
    this.store.dispatch(addToNotes({ activity: boredActivity }));
  }

  // recalled for get another idea button click
  getIdeas() {
    this.store.dispatch(fetchActivity());
    console.log('Number of Participants:', this.numberOfParticipants);
  }
}
