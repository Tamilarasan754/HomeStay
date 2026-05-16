import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './interceptors/loading.interceptor'; 
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
export const MY_FORMATS = { parse: { dateInput: 'input', }, display: { dateInput: { year: 'numeric', month: 'short', day: '2-digit' }, monthYearLabel: { year: 'numeric', month: 'short' }, dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' }, monthYearA11yLabel: { year: 'numeric', month: 'long' } } };
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()), 
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([loadingInterceptor])
    ),
   { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
};