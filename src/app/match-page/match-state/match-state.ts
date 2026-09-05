import { Component, computed, OnInit, signal } from '@angular/core';

@Component({
  selector: 'match-state',
  imports: [],
  templateUrl: './match-state.html',
  styleUrl: './match-state.css',
  host: { class: 'block min-w-0 shrink-0' },
})
export class MatchState implements OnInit {
  homeScore = signal<number | undefined>(undefined);

  awayScore = signal<number | undefined>(undefined);

  status = signal<string | undefined>(undefined);

  loaded = computed(
    () =>
      this.homeScore() !== undefined &&
      this.awayScore() !== undefined &&
      this.status() !== undefined,
  );

  ngOnInit() {
    setTimeout(() => {
      this.homeScore.set(2);
      this.awayScore.set(1);
      this.status.set('LIVE');
    }, 3000);
  }
}
