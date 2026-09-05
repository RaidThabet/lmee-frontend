import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'match-row',
  imports: [],
  templateUrl: './match-row.html',
  styleUrl: './match-row.css',
})
export class MatchRow {
  router = inject(Router);

  matchId = input.required<string | undefined>();

  homeClubName = input.required<string | undefined>();

  awayClubName = input.required<string | undefined>();

  date = input.required<string | null | undefined>();

  time = input.required<string | null | undefined>();

  status = input.required<string | undefined>();

  navigateToMatch(matchId: string | undefined) {
    this.router.navigate(['/matches', matchId]);
  }
}
