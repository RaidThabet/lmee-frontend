import { Component } from '@angular/core';
import { MatchSide } from './match-side/match-side';
import { MatchState } from './match-state/match-state';

@Component({
  selector: 'app-match-page',
  imports: [MatchSide, MatchState],
  templateUrl: './match-page.html',
  styleUrl: './match-page.css',
})
export class MatchPage {}
