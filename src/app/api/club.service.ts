import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { API_BASE_URL } from './api-base-url';
import type { ClubDTO, IdResponseDTO } from './models';

@Injectable({ providedIn: 'root' })
export class ClubService {
  readonly #http = inject(HttpClient);
  readonly #base = inject(API_BASE_URL);

  readonly clubsResource = () =>
    httpResource<ClubDTO[]>(() => `${this.#base}/api/clubs`, { defaultValue: [] });

  readonly clubResource = (id: Signal<string | undefined>) =>
    httpResource<ClubDTO>(() => {
      const clubId = id();
      return clubId ? `${this.#base}/api/clubs/${clubId}` : undefined;
    });

  createClub(body: ClubDTO) {
    return this.#http.post<IdResponseDTO>(`${this.#base}/api/clubs`, body);
  }

  updateClub(id: string, body: ClubDTO) {
    return this.#http.put<IdResponseDTO>(`${this.#base}/api/clubs/${id}`, body);
  }

  deleteClub(id: string) {
    return this.#http.delete<void>(`${this.#base}/api/clubs/${id}`);
  }
}
