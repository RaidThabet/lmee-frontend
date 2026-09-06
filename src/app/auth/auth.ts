import { computed, inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { KEYCLOAK_EVENT_SIGNAL } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class Auth {
  readonly #keycloak = inject(Keycloak);
  readonly #events = inject(KEYCLOAK_EVENT_SIGNAL);

  readonly isAuthenticated = computed(() => {
    this.#events();
    return this.#keycloak.authenticated ?? false;
  });

  readonly fullName = computed(() => {
    this.#events();
    const token = this.#keycloak.tokenParsed;
    if (!token) return '';
    const name = token['name'] as string | undefined;
    const username = token['preferred_username'] as string | undefined;
    return name ?? username ?? '';
  });

  readonly isAdmin = computed(() => {
    this.#events();
    return this.#keycloak.realmAccess?.roles.includes('ADMIN') ?? false;
  });

  readonly isOperator = computed(() => {
    this.#events;
    return this.#keycloak.realmAccess?.roles.includes('OPERATOR') ?? false;
  });

  login() {
    this.#keycloak.login();
  }

  logout() {
    this.#keycloak.logout();
  }
}
