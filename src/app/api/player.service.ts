import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { API_BASE_URL } from './api-base-url';
import type { IdResponseDTO, PlayerDTO } from './models';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  readonly #http = inject(HttpClient);
  readonly #base = inject(API_BASE_URL);

  readonly playersResource = () =>
    httpResource<PlayerDTO[]>(() => `${this.#base}/api/players`, { defaultValue: [] });

  readonly playerResource = (id: Signal<string | undefined>) =>
    httpResource<PlayerDTO>(() => {
      const playerId = id();
      return playerId ? `${this.#base}/api/players/${playerId}` : undefined;
    });

  createPlayer(body: PlayerDTO) {
    return this.#http.post<IdResponseDTO>(`${this.#base}/api/players`, body);
  }

  updatePlayer(id: string, body: PlayerDTO) {
    return this.#http.put<IdResponseDTO>(`${this.#base}/api/players/${id}`, body);
  }

  deletePlayer(id: string) {
    return this.#http.delete<void>(`${this.#base}/api/players/${id}`);
  }
}
