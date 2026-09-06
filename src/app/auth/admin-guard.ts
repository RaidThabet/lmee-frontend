import { createAuthGuard } from 'keycloak-angular';
import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard = createAuthGuard<CanActivateChildFn>(
  async (route, state, { authenticated, grantedRoles, keycloak }) => {
    const router = inject(Router);

    if (!authenticated) {
      await keycloak.login({ redirectUri: window.location.origin + state.url });
      return false;
    }

    return grantedRoles.realmRoles.includes("ADMIN") || router.createUrlTree(["/matches"]);
  }
)
