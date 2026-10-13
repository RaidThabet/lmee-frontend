import { Component, inject, signal } from '@angular/core';
import { Button } from '@openng/optimus-ui/button';
import { Card } from '@openng/optimus-ui/card';
import { InputText } from '@openng/optimus-ui/inputtext';
import { Message } from '@openng/optimus-ui/message';
import { TableModule } from '@openng/optimus-ui/table';
import { Router } from '@angular/router';
import { UserClubsService } from '../api/user-clubs.service';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { apiErrorMessage, ClubService } from '../api';

@Component({
  selector: 'favourite-clubs',
  imports: [Button, Card, InputText, Message, TableModule, FormField],
  templateUrl: './favourite-clubs.html',
  styleUrl: './favourite-clubs.css',
})
export class FavouriteClubs {
  router = inject(Router);

  userClubService = inject(UserClubsService);

  userFavouriteClubs = this.userClubService.userFavouriteClubs();

  clubs = inject(ClubService).clubsResource();

  error = signal<string | undefined>(undefined);

  model = signal({ clubId: '' });

  userClubForm = form(this.model, (userClub) => {
    required(userClub.clubId);
  });

  navigateToMatches() {
    this.router.navigate(['/matches']);
  }

  save() {
    this.error.set(undefined);
    submit(this.userClubForm, async () => {
      const body = this.model

      try {
        await firstValueFrom(this.userClubService.addFavouriteClub({ id: body().clubId }));
      } catch (error) {
        this.error.set(apiErrorMessage(error));
        return;
      }

      this.userFavouriteClubs.reload();
    });
  }

  remove(clubId: string) {
    this.error.set(undefined);
    this.userClubService.deleteFavouriteClub(clubId).subscribe({
      next: () => this.userFavouriteClubs.reload(),
      error: (error) => this.error.set(apiErrorMessage(error)),
    });

  }
}
