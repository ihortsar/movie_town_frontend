import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LoaderInterceptorService } from './services/loader-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
  
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }, provideHttpClient(withFetch()), provideRouter(routes), provideClientHydration(), provideAnimationsAsync()]
};
