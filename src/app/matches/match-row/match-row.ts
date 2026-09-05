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

  matchId = input.required<string>();

  homeClubName = input.required<string>();

  awayClubName = input.required<string>();

  date = input.required<string>();

  time = input.required<string>();

  status = input.required<string>();

  navigateToMatch(matchId: string) {
    this.router.navigate(["/matches", matchId])
  }
}
