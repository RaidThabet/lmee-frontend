import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'match-state',
  imports: [],
  templateUrl: './match-state.html',
  styleUrl: './match-state.css',
  host: { class: 'block min-w-0 shrink-0' },
})
export class MatchState {
  homeScore = input.required<number | undefined>();

  awayScore = input.required<number | undefined>();

  status = input.required<string | undefined>();
}
