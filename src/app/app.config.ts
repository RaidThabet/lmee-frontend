import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideKeycloakAngular } from './keycloak-config';
import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { provideOptimus } from '@openng/optimus-ui/config';
import Aura from '@openng/optimus-ui-themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideOptimus({
      theme: {
        preset: Aura,
        options: {
          cssLayer: { name: 'optimus', order: 'theme, base, optimus' },
        },
      },
    }),
  ],
};
