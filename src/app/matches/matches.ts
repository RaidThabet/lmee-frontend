import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatchRow } from './match-row/match-row';
import { MatchService } from '../api';

@Component({
  selector: 'matches',
  imports: [MatchRow, DatePipe],
  templateUrl: './matches.html',
  styleUrl: './matches.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Matches {
  matchService = inject(MatchService);

  matches = this.matchService.matchesResource();
}
