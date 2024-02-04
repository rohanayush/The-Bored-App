import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ParticipantDialogComponent } from './shared/participant-dialog/participant-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ActivityEffects } from './store/effects/boring-effects';
import { activityReducer } from './store/reducers/boring-reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [AppComponent, ParticipantDialogComponent],
  imports: [
    BrowserModule,
    MatDialogModule,
    CommonModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    StoreModule.forRoot({ boredActivity: activityReducer }),
    EffectsModule.forRoot([ActivityEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }) ,
    MatListModule,
    MatCardModule
  ],
  providers: [
    provideRouter(routes), // Provide the router
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
