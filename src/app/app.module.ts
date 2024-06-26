import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { AppComponent } from './app.component';
import { ParticipantDialogComponent } from './shared/participant-dialog/participant-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { CommonModule } from '@angular/common';
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
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent, ParticipantDialogComponent],
  imports: [
    BrowserModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    // Here we register the state reducer, as reducer manages the state
    // state would be with property 'boredActivity' and store:
    /**
      boredActivity:{
        boredActivity:{},
        added:[],
        message:"string"
      }
     */
    StoreModule.forRoot({ boredActivity: activityReducer }),

    // effects registered
    EffectsModule.forRoot([ActivityEffects]),

    // for checking the state in chrome devtools
    StoreDevtoolsModule.instrument({ maxAge: 25 }) ,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    // this is for pwa purpose
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [
    provideRouter(routes), // Provide the router
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
