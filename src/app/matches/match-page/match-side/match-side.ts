import { Component, computed, input, OnInit, signal } from '@angular/core';
import { MatchState } from '../match-state/match-state';

@Component({
  selector: 'match-side',
  imports: [MatchState],
  templateUrl: './match-side.html',
  styleUrl: './match-side.css',
  host: { class: 'block min-w-0 flex-1' },
})
export class MatchSide {
  clubName = input.required<string | undefined>();

  isHome = input.required<string | undefined>();

  reds = input.required<number | undefined>();

  yellows = input.required<number | undefined>();

  subs = input.required<number | undefined>();

  loaded = computed(
    () =>
      this.clubName() !== undefined &&
      this.reds() !== undefined &&
      this.yellows() !== undefined &&
      this.subs() !== undefined,
  );
}
