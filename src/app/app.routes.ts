import { Routes } from '@angular/router';
import { MatchPage } from './matches/match-page/match-page';
import { App } from './app';
import { Matches } from './matches/matches';
import { Clubs } from './clubs/clubs';
import { Players } from './players/players';
import { adminGuard } from './auth/admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'matches', pathMatch: 'full' },
  { path: 'matches', component: Matches },
  { path: 'matches/:matchId', component: MatchPage },
  { path: 'clubs', component: Clubs, canActivate: [adminGuard] },
  { path: 'players', component: Players, canActivate: [adminGuard] },
];
