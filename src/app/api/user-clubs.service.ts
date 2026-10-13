import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { API_BASE_URL } from './api-base-url';
import { ClubDTO, IdResponseDTO } from './models';

@Injectable({ providedIn: 'root' })
export class UserClubsService {
  readonly #http = inject(HttpClient);
  readonly #base = inject(API_BASE_URL);

  readonly userFavouriteClubs = () =>
    httpResource<ClubDTO[]>(() => `${this.#base}/api/user-clubs`, { defaultValue: [] });

  addFavouriteClub(body: IdResponseDTO) {
    return this.#http.post<ClubDTO>(`${this.#base}/api/user-clubs`, body);
  }

  deleteFavouriteClub(clubId: string) {
    return this.#http.delete<void>(`${this.#base}/api/user-clubs/${clubId}`);
  }
}
