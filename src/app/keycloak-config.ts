import {
  provideKeycloak,
  createInterceptorCondition,
  withAutoRefreshToken,
  AutoRefreshTokenService,
  UserActivityService,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
} from 'keycloak-angular';
import { environment } from '../environments/environment';

const escaped = environment.apiBaseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const apiCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: new RegExp(`^${escaped}(/.*)?$`, 'i'),
});

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: environment.keycloak,
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    },
    features: [withAutoRefreshToken({ onInactivityTimeout: 'logout', sessionTimeout: 1_800_000 })],
    providers: [
      AutoRefreshTokenService,
      UserActivityService,
      { provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, useValue: [apiCondition] },
    ],
  });
