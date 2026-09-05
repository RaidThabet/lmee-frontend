import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { API_BASE_URL } from './api-base-url';
import type { MatchCommand } from './match-command';
import type {
  CreateMatchRequest,
  CreateMatchResponse,
  MatchEventDTO,
  MatchResponse,
  MatchStateDTO,
} from './models';

@Injectable({ providedIn: 'root' })
export class MatchService {
  readonly #http = inject(HttpClient);
  readonly #base = inject(API_BASE_URL);

  readonly matchesResource = () =>
    httpResource<MatchResponse[]>(() => `${this.#base}/matches`, { defaultValue: [] });

  readonly matchResource = (matchId: Signal<string | undefined>) =>
    httpResource<MatchResponse>(() => {
      const id = matchId();
      return id ? `${this.#base}/matches/${id}` : undefined;
    });

  readonly matchStateResource = (matchId: Signal<string | undefined>) =>
    httpResource<MatchStateDTO>(() => {
      const id = matchId();
      return id ? `${this.#base}/matches/${id}/state` : undefined;
    });

  readonly matchEventsResource = (matchId: Signal<string | undefined>) =>
    httpResource<MatchEventDTO[]>(
      () => {
        const id = matchId();
        return id ? `${this.#base}/matches/${id}/events` : undefined;
      },
      { defaultValue: [] },
    );

  registerMatch(body: CreateMatchRequest) {
    return this.#http.post<CreateMatchResponse>(`${this.#base}/matches`, body);
  }

  recordEvent(matchId: string, command: MatchCommand) {
    return this.#http.post<void>(`${this.#base}/matches/${matchId}/events`, command);
  }
}
