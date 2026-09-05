import { Routes } from '@angular/router';
import { MatchPage } from './matches/match-page/match-page';
import { App } from './app';
import { Matches } from './matches/matches';

export const routes: Routes = [
  {path: "", redirectTo: "matches", pathMatch: "full"},
  {path: "matches", component: Matches},
  {path: "matches/:matchId", component: MatchPage}
];
