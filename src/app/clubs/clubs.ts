import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { apiErrorMessage, ClubService, type ClubDTO } from '../api';

@Component({
  selector: 'clubs',
  imports: [FormField],
  templateUrl: './clubs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Clubs {
  router = inject(Router);

  clubService = inject(ClubService);

  clubs = this.clubService.clubsResource();

  editingId = signal<string | undefined>(undefined);

  error = signal<string | undefined>(undefined);

  model = signal({ name: '', country: '' });

  clubForm = form(this.model, (club) => {
    required(club.name);
    required(club.country);
  });

  navigateToMatches() {
    this.router.navigate(['/matches']);
  }

  edit(club: ClubDTO) {
    this.editingId.set(club.id);
    this.model.set({ name: club.name, country: club.country });
  }

  cancel() {
    this.editingId.set(undefined);
    this.model.set({ name: '', country: '' });
    this.clubForm().reset();
  }

  save() {
    this.error.set(undefined);

    submit(this.clubForm, async () => {
      const id = this.editingId();
      const body = this.model();

      try {
        await firstValueFrom(
          id ? this.clubService.updateClub(id, body) : this.clubService.createClub(body),
        );
      } catch (error) {
        this.error.set(apiErrorMessage(error));
        return;
      }

      this.cancel();
      this.clubs.reload();
    });
  }

  remove(id: string | undefined) {
    if (!id) return;

    this.error.set(undefined);

    this.clubService.deleteClub(id).subscribe({
      next: () => this.clubs.reload(),
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }
}
