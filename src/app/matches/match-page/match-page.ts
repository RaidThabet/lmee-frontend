import { Component, inject, signal } from '@angular/core';
import { MatchEvent } from './match-event/match-event';
import { MatchSide } from './match-side/match-side';
import { MatchState } from './match-state/match-state';
import { MatchService } from '../../api';
import { ActivatedRoute } from '@angular/router';

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

  matchState = this.matchService.matchStateResource(this.matchId);

  matchEvents = this.matchService.matchEventsResource(this.matchId);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.matchId.set(params['matchId']);
    });
  }
}
