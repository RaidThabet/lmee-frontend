import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message } from '@openng/optimus-ui/message';
import { Skeleton } from '@openng/optimus-ui/skeleton';
import { MatchRow } from './match-row/match-row';
import { MatchService } from '../api';
import { Auth } from '../auth/auth';
import { Button } from '@openng/optimus-ui/button';
import { ScheduleDrawer } from './schedule-drawer/schedule-drawer';

@Component({
  selector: 'matches',
  imports: [MatchRow, DatePipe, Message, Skeleton, Button, ScheduleDrawer],
  templateUrl: './matches.html',
  styleUrl: './matches.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Matches {
  drawerVisible = signal(false);

  auth = inject(Auth);

  matchService = inject(MatchService);

  matches = this.matchService.matchesResource();

  openScheduleDialog() {
    this.drawerVisible.set(true);
  }
}
