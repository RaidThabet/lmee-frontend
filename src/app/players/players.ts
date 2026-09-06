import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { apiErrorMessage, ClubService, PlayerService, type PlayerDTO } from '../api';

@Component({
  selector: 'players',
  imports: [FormField],
  templateUrl: './players.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Players {
  router = inject(Router);

  playerService = inject(PlayerService);

  players = this.playerService.playersResource();

  clubs = inject(ClubService).clubsResource();

  editingId = signal<string | undefined>(undefined);

  error = signal<string | undefined>(undefined);

  model = signal({ name: '', club: '' });

  playerForm = form(this.model, (player) => {
    required(player.name);
    required(player.club);
  });

  clubName(clubId: string) {
    return this.clubs.value().find((club) => club.id === clubId)?.name ?? clubId;
  }

  navigateToMatches() {
    this.router.navigate(['/matches']);
  }

  edit(player: PlayerDTO) {
    this.editingId.set(player.id);
    this.model.set({ name: player.name, club: player.club });
  }

  cancel() {
    this.editingId.set(undefined);
    this.model.set({ name: '', club: '' });
    this.playerForm().reset();
  }

  save() {
    this.error.set(undefined);

    submit(this.playerForm, async () => {
      const id = this.editingId();
      const body = this.model();

      try {
        await firstValueFrom(
          id ? this.playerService.updatePlayer(id, body) : this.playerService.createPlayer(body),
        );
      } catch (error) {
        this.error.set(apiErrorMessage(error));
        return;
      }

      this.cancel();
      this.players.reload();
    });
  }

  remove(id: string | undefined) {
    if (!id) return;

    this.error.set(undefined);

    this.playerService.deletePlayer(id).subscribe({
      next: () => this.players.reload(),
      error: (error) => this.error.set(apiErrorMessage(error)),
    });
  }
}
