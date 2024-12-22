import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { taskReducer } from './stores/task.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      { eventCoalescing: true }
    ),
    provideRouter(routes),
    provideClientHydration(),

    // Ajout de la configuration du Store NgRx
    provideStore(),
    provideState('tasks', taskReducer) // On enregistre la "slice" du state 'tasks'

    //provideStoreDevtools() // Active les DevTools NgRx
  ]
};
