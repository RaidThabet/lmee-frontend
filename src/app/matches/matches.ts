import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatchRow } from './match-row/match-row';

interface Match {
  id: string;
  homeClubName: string;
  awayClubName: string;
  date: string;
  time: string;
  status: string;
}

const MOCK_MATCHES: readonly Match[] = [
  {
    id: 'm-001',
    homeClubName: 'Espérance de Tunis',
    awayClubName: 'Club Africain',
    date: 'Sat 5 Sep',
    time: '19:00',
    status: 'SCHEDULED',
  },
  {
    id: 'm-002',
    homeClubName: 'Étoile du Sahel',
    awayClubName: 'CS Sfaxien',
    date: 'Sat 5 Sep',
    time: '21:30',
    status: 'LIVE',
  },
  {
    id: 'm-003',
    homeClubName: 'Stade Tunisien',
    awayClubName: 'US Monastir',
    date: 'Fri 4 Sep',
    time: '17:00',
    status: 'FT 2 - 1',
  },
  {
    id: 'm-004',
    homeClubName: 'CA Bizertin',
    awayClubName: 'Olympique Béja',
    date: 'Sun 6 Sep',
    time: '15:00',
    status: 'POSTPONED',
  },
  {
    id: 'm-005',
    homeClubName: 'JS Kairouan',
    awayClubName: 'AS Gabès',
    date: 'Sun 6 Sep',
    time: '18:45',
    status: 'SCHEDULED',
  },
];

@Component({
  selector: 'matches',
  imports: [MatchRow],
  templateUrl: './matches.html',
  styleUrl: './matches.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Matches {
  readonly matches = MOCK_MATCHES;
}
