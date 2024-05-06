import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParticipantDialogComponent } from './shared/participant-dialog/participant-dialog.component';
import {
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
  
  title = 'idea-app';
  boredActivity$: Observable<BoredActivity | null>;
  fetchedData$: Observable<BoredActivity[] | null> | undefined;
  fetchedDataSubscription: Subscription | undefined;

  // this will get executed at first
  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    // this will contain the recent activity
    this.boredActivity$ = this.store.pipe(select(selectBoredActivity));
  }

  // executed after constructor
  ngOnInit() {
    const storedData = localStorage.getItem('addedNotes');

    if (storedData) {
      const parsedData: BoredActivity[] = JSON.parse(storedData);
      this.store.dispatch(replaceAddedActivity({ data: parsedData }));
    }

    // contain values under added property in state
    // here an observable/stream is returned (holding the value inside it),
    //that can be subscribed
    this.fetchedData$ = this.store.pipe(select(fetchAddedActivity));

    // Setting added activity in local storage so that it persists
    // so whenever a new activity is added into the added it stores 
    // the added property in localstorage
    this.fetchedDataSubscription = this.fetchedData$.subscribe((data) => {
      localStorage.setItem('addedNotes', JSON.stringify(data));
    });
  }

  // For opening the dialog box , that shows a new activity
  // and other options
  openParticipantDialog() { 
    if (this.boredActivity$) {
      const dialogRef = this.dialog.open(ParticipantDialogComponent);

      dialogRef.componentInstance.boredActivity$.subscribe((result) => {
        console.log('The dialog was closed');
        console.log('Selected BoredActivity:', result);
      });
    }
  }

  // remove action is dispatched with key as argument/props
  removeItem(key: string): void {
    this.store.dispatch(removeItem({ key: key }));
  }
}
