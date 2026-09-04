import { Component, input } from '@angular/core';

@Component({
  selector: 'match-row',
  imports: [],
  templateUrl: './match-row.html',
  styleUrl: './match-row.css',
})
export class MatchRow {
  homeClubName = input.required<string>();

  awayClubName = input.required<string>();

  date = input.required<string>();

  time = input.required<string>();

  status = input.required<string>();
}
