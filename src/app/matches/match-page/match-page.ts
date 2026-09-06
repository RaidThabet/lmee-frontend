import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatchEvent } from './match-event/match-event';
import { MatchSide } from './match-side/match-side';
import { MatchState } from './match-state/match-state';
import { MatchService } from '../../api';
import { ActivatedRoute } from '@angular/router';
import { MatchSocketService } from '../../api/match-socket.service';

@Component({
  selector: 'app-match-page',
  imports: [MatchSide, MatchState, MatchEvent],
  templateUrl: './match-page.html',
  styleUrl: './match-page.css',
})
export class MatchPage {
  matchId = signal('');
  private activatedRoute = inject(ActivatedRoute);

  matchService = inject(MatchService);

  matchSocketService = inject(MatchSocketService);

  matchState = this.matchService.matchStateResource(this.matchId);

  matchEvents = this.matchService.matchEventsResource(this.matchId);

  liveEvents = this.matchSocketService.matchEvents(this.matchId);

  // events are those that come from the REST API alongside the new ones coming from websocket
  events = computed(() => {
    const snapshot = this.matchEvents.value();
    const last = snapshot.at(-1)?.sequenceNumber ?? -1;
    const live = this.liveEvents();
    const kept = live.filter((e) => (e.sequenceNumber ?? 0) > last);
    return [...snapshot, ...kept];
  })

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.matchId.set(params['matchId']);
    });
    effect(() => {
      if (this.liveEvents().length) {
        this.matchState.reload();
        this.matchEvents.reload();
      }
    });
  }
}
