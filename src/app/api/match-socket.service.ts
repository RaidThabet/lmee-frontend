import { effect, inject, Injectable, signal, Signal } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { API_BASE_URL } from './api-base-url';
import type { MatchEventDTO, MatchEventType } from './models';

@Injectable({ providedIn: 'root' })
export class MatchSocketService {
  readonly #url = inject(API_BASE_URL).replace(/^http/, 'ws') + '/ws';

  matchEvents(matchId: Signal<string | undefined>): Signal<MatchEventDTO[]> {
    const events = signal<MatchEventDTO[]>([]);

    effect((onCleanup) => {
      const id = matchId();
      if (!id) return;
      events.set([]);

      const client = new Client({
        brokerURL: this.#url,
        onConnect: () => {
          client.subscribe(`/topic/matches/${id}`, (message) => {
            const parsed = JSON.parse(message.body) as {
              type: MatchEventType;
              event: MatchEventDTO;
            };
            events.update((previous) => {
              return [...previous, parsed.event];
            });
          });
        },
      });

      client.activate();
      onCleanup(() => void client.deactivate());
    });

    return events.asReadonly();
  }
}
