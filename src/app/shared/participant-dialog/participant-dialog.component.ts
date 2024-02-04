import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BoredActivity, AppState } from '../../store/states/app-state';
import {
  selectBoredActivity, selectError,
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
    // Dispatch the fetchActivity() action only once when the component is initialized
    this.store.dispatch(fetchActivity());

    // Subscribe to the boredActivity$ and error$ observables

    this.error$ = this.store.pipe(select(selectError));

    // Subscribe to error$ to handle errors
    this.error$.subscribe(error => {
      if (error) {
        this.handleErrors(error);
      }
    });
  }

  constructor(
    public dialogRef: MatDialogRef<ParticipantDialogComponent>,
    private store: Store<AppState>
  ) {
    this.boredActivity$ = this.store.pipe(select(selectBoredActivity));

  }

  addToNotes(boredActivity: BoredActivity) {
    console.log('added an Activity', boredActivity);
    this.store.dispatch(addToNotes({ activity: boredActivity }));
  }

  logSliderValue() {
    this.store.dispatch(fetchActivity());
    console.log('Number of Participants:', this.numberOfParticipants);
  }

  handleErrors(error: string) {
    alert(error);
  }
}
