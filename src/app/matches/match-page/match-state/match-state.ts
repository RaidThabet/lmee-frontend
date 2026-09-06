import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Tag } from '@openng/optimus-ui/tag';
import { statusLabel, statusSeverity } from '../../match-status';
import { Auth } from '../../../auth/auth';
import { Button } from '@openng/optimus-ui/button';

@Component({
  selector: 'match-state',
  imports: [Tag, Button],
  templateUrl: './match-state.html',
  styleUrl: './match-state.css',
  host: { class: 'block min-w-0 shrink-0' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchState {
  auth = inject(Auth);

  start = output<void>();

  homeScore = input.required<number | undefined>();

  awayScore = input.required<number | undefined>();

  status = input.required<string | undefined>();

  statusLabel = computed(() => statusLabel(this.status()));

  statusSeverity = computed(() => statusSeverity(this.status()));

  startMatch() {
    this.start.emit();
  }
}
