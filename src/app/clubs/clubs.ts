import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Button } from '@openng/optimus-ui/button';
import { Card } from '@openng/optimus-ui/card';
import { InputText } from '@openng/optimus-ui/inputtext';
import { Message } from '@openng/optimus-ui/message';
import { TableModule } from '@openng/optimus-ui/table';
import { apiErrorMessage, ClubService, DEFAULT_CLUB_CREST_URL, type ClubDTO } from '../api';
import { NgOptimizedImage } from '@angular/common';
import { FileUpload, FileUploadEvent } from '@openng/optimus-ui/fileupload';

@Component({
  selector: 'clubs',
  imports: [FormField, Button, Card, InputText, Message, TableModule, NgOptimizedImage, FileUpload],
  templateUrl: './clubs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Clubs {
  router = inject(Router);

  protected readonly defaultCrest = DEFAULT_CLUB_CREST_URL;

  clubService = inject(ClubService);

  clubs = this.clubService.clubsResource();

  editingId = signal<string | undefined>(undefined);

  error = signal<string | undefined>(undefined);

  model = signal({ name: '', country: '', crestUrl: '' });

  clubForm = form(this.model, (club) => {
    required(club.name);
    required(club.country);
  });

  navigateToMatches() {
    this.router.navigate(['/matches']);
  }

  edit(club: ClubDTO) {
    this.editingId.set(club.id);
    this.model.set({ name: club.name, country: club.country, crestUrl: club.crestUrl ?? '' });
  }

  cancel() {
    this.editingId.set(undefined);
    this.model.set({ name: '', country: '', crestUrl: '' });
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

  protected onCrestUpload($event: FileUploadEvent) {
    const response = $event.originalEvent;
    if (response instanceof HttpResponse) {
      const body = response.body as { crestUrl?: string } | null;
      if (body?.crestUrl) {
        this.model.update((model) => ({ ...model, crestUrl: body.crestUrl! }));
      }
    }
  }
}
