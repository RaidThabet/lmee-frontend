import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { MatchEventDTO, MatchEventType } from '../../../api';

const LABELS: Record<MatchEventType, string> = {
  MATCH_SCHEDULED: 'Match scheduled',
  MATCH_STARTED: 'Kick-off',
  FIRST_HALF_ENDED: 'Half-time',
  SECOND_HALF_STARTED: 'Second half',
  FULL_TIME: 'Full time',
  MATCH_ABANDONED: 'Match abandoned',
  MATCH_POSTPONED: 'Match postponed',
  GOAL_SCORED: 'Goal',
  OWN_GOAL: 'Own goal',
  GOAL_CANCELED: 'Goal disallowed',
  YELLOW_CARD_GIVEN: 'Yellow card',
  RED_CARD_GIVEN: 'Red card',
  SECOND_YELLOW_CARD: 'Second yellow',
  SUBSTITUTION: 'Substitution',
  PENALTY_AWARDED: 'Penalty awarded',
  PENALTY_SCORED: 'Penalty scored',
  PENALTY_MISSED: 'Penalty missed',
  VAR_CHECK_STARTED: 'VAR check',
  VAR_DECISION: 'VAR decision',
  ADDED_TIME_ANNOUNCED: 'Added time',
};

@Component({
  selector: 'match-event',
  imports: [],
  templateUrl: './match-event.html',
  styleUrl: './match-event.css',
  host: { class: 'block w-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchEvent {
  event = input.required<MatchEventDTO>();

  side = computed(() => {
    const isHomeClub = this.event().isHomeClub;
    if (isHomeClub === undefined) {
      return 'neutral';
    }
    return isHomeClub ? 'home' : 'away';
  });

  alignClass = computed(() => {
    switch (this.side()) {
      case 'home':
        return 'w-1/2 mr-auto text-left';
      case 'away':
        return 'w-1/2 ml-auto text-right';
      default:
        return 'w-full text-center';
    }
  });

  label = computed(() => {
    const type = this.event().type;
    return type ? LABELS[type] : 'Match event';
  });

  minuteLabel = computed(() => {
    const { minute, addedMinutes } = this.event();
    if (minute === undefined) {
      return '';
    }
    return addedMinutes ? `${minute}+${addedMinutes}'` : `${minute}'`;
  });

  detail = computed(() => {
    const event = this.event();
    switch (event.type) {
      case 'SUBSTITUTION':
        return [
          event.playerInName && `In ${event.playerInName}`,
          event.playerOutName && `Out ${event.playerOutName}`,
        ]
          .filter(Boolean)
          .join(', ');
      case 'ADDED_TIME_ANNOUNCED':
        return event.addedMinutes ? `+${event.addedMinutes} min` : '';
      case 'VAR_CHECK_STARTED':
      case 'VAR_DECISION':
        return [event.decision, event.reason].filter(Boolean).join(', ');
      default:
        return [event.playerName, event.reason].filter(Boolean).join(', ');
    }
  });

  text = computed(() =>
    [this.minuteLabel(), this.label(), this.detail()].filter(Boolean).join(' '),
  );
}
