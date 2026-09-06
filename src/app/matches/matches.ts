import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message } from '@openng/optimus-ui/message';
import { Skeleton } from '@openng/optimus-ui/skeleton';
import { MatchRow } from './match-row/match-row';
import { MatchService } from '../api';

@Component({
  selector: 'matches',
  imports: [MatchRow, DatePipe, Message, Skeleton],
  templateUrl: './matches.html',
  styleUrl: './matches.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Matches {
  matchService = inject(MatchService);

  matches = this.matchService.matchesResource();
}
