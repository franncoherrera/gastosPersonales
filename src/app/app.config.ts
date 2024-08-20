import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BarController, Colors, Legend } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { FIREBASE_CONFIG } from '../../public/constants/firebase-credentials.const';
import { appReducers } from './app.reducer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    importProvidersFrom(StoreModule.forRoot(appReducers)),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideCharts(withDefaultRegisterables()),
    provideCharts(withDefaultRegisterables()),
    provideCharts({ registerables: [BarController, Legend, Colors] }),
  ],
};
