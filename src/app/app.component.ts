import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParticipantDialogComponent } from './shared/participant-dialog/participant-dialog.component';
import {
  fetchAddedData,
  removeItem,
  replaceAddedActivity,
} from './store/actions/boring-action';
import { Store, select } from '@ngrx/store';
import { AppState, BoredActivity } from './store/states/app-state';
import {
  fetchAddedActivity,
  selectBoredActivity,
} from './store/selectors.ts/boring-selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'youth';
  boredActivity$: Observable<BoredActivity | null>;
  fetchedData$: Observable<BoredActivity[] | null> | undefined;
  fetchedDataSubscription: Subscription | undefined;
  ngOnInit() {
    const storedData = localStorage.getItem('addedNotes');
    if (storedData) {
      const parsedData: BoredActivity[] = JSON.parse(storedData);
      this.store.dispatch(replaceAddedActivity({ data: parsedData }));
    }
    this.fetchedData$ = this.store.pipe(select(fetchAddedActivity));
    this.fetchedDataSubscription = this.fetchedData$.subscribe((data) => {
      localStorage.setItem('addedNotes', JSON.stringify(data));
    });
  }

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.boredActivity$ = this.store.pipe(select(selectBoredActivity));
    // this.store.dispatch(fetchAddedData());
  }

  openParticipantDialog() { 
    if (this.boredActivity$) {
      const dialogRef = this.dialog.open(ParticipantDialogComponent);

      dialogRef.componentInstance.boredActivity$.subscribe((result) => {
        console.log('The dialog was closed');
        console.log('Selected BoredActivity:', result);
      });
    }
  }

  removeItem(key: string): void {
    this.store.dispatch(removeItem({ key: key }));
  }
}
