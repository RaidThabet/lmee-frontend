import { ChangeDetectionStrategy, Component, inject, model, output, signal } from '@angular/core';
import { Dialog } from '@openng/optimus-ui/dialog';
import { Button } from '@openng/optimus-ui/button';
import { InputText } from '@openng/optimus-ui/inputtext';
import { apiErrorMessage, ClubService, CreateMatchRequest, MatchService } from '../../api';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from '@openng/optimus-ui/datepicker';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'schedule-drawer',
  imports: [Dialog, Button, InputText, FormField, FormsModule, DatePickerModule],
  templateUrl: './schedule-drawer.html',
  styleUrl: './schedule-drawer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDrawer {
  isVisible = model.required<boolean>();

  saved = output<void>();

  matchService = inject(MatchService);

  clubs = inject(ClubService).clubsResource();

  error = signal<string | undefined>(undefined);

  model = signal<CreateMatchRequest>({
    homeTeamId: '',
    awayTeamId: '',
    venue: '',
    scheduledKickoff: '',
  });

  matchForm = form(this.model, (match) => {
    required(match.homeTeamId);
    required(match.awayTeamId);
    required(match.venue);
    required(match.scheduledKickoff);
  });

  save() {
    this.error.set(undefined);

    submit(this.matchForm, async () => {
      const body = this.model();

      try {
        await firstValueFrom(this.matchService.registerMatch(body));
      } catch (error) {
        this.error.set(apiErrorMessage(error));
        return;
      }
      this.matchForm().reset();
      this.isVisible.set(false);
      this.saved.emit();
    });
  }
}
