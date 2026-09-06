import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from '@openng/optimus-ui/tag';
import { statusLabel, statusSeverity } from '../match-status';

@Component({
  selector: 'match-row',
  imports: [Tag],
  templateUrl: './match-row.html',
  styleUrl: './match-row.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchRow {
  router = inject(Router);

  matchId = input.required<string | undefined>();

  homeClubName = input.required<string | undefined>();

  awayClubName = input.required<string | undefined>();

  date = input.required<string | null | undefined>();

  time = input.required<string | null | undefined>();

  status = input.required<string | undefined>();

  statusLabel = computed(() => statusLabel(this.status()));

  statusSeverity = computed(() => statusSeverity(this.status()));

  navigateToMatch(matchId: string | undefined) {
    this.router.navigate(['/matches', matchId]);
  }
}
