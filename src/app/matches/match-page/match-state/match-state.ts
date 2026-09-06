import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Tag } from '@openng/optimus-ui/tag';
import { statusLabel, statusSeverity } from '../../match-status';

@Component({
  selector: 'match-state',
  imports: [Tag],
  templateUrl: './match-state.html',
  styleUrl: './match-state.css',
  host: { class: 'block min-w-0 shrink-0' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchState {
  homeScore = input.required<number | undefined>();

  awayScore = input.required<number | undefined>();

  status = input.required<string | undefined>();

  statusLabel = computed(() => statusLabel(this.status()));

  statusSeverity = computed(() => statusSeverity(this.status()));
}
