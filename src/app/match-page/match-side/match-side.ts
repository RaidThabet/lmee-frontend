import { Component, computed, input, OnInit, signal } from '@angular/core';
import { MatchState } from '../match-state/match-state';

@Component({
  selector: 'match-side',
  imports: [MatchState],
  templateUrl: './match-side.html',
  styleUrl: './match-side.css',
  host: { class: 'block min-w-0 flex-1' },
})
export class MatchSide implements OnInit {
  clubName = signal<string | undefined>(undefined);

  reds = signal<number | undefined>(undefined);

  yellows = signal<number | undefined>(undefined);

  subs = signal<number | undefined>(undefined);

  loaded = computed(
    () =>
      this.clubName() !== undefined &&
      this.reds() !== undefined &&
      this.yellows() !== undefined &&
      this.subs() !== undefined,
  );

  ngOnInit() {
    setTimeout(() => {
      this.clubName.set('Home Club');
      this.reds.set(1);
      this.yellows.set(2);
      this.subs.set(3);
    }, 3000);
  }
}
