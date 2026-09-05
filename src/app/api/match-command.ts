import type { MatchEventType } from './models';

type Cmd<T extends MatchEventType, P = unknown> = { type: T } & P;

interface ClubMinute {
  clubId: string;
  minute: number;
}

interface PlayerAction extends ClubMinute {
  playerId: string;
}

export type MatchCommand =
  | Cmd<'MATCH_STARTED'>
  | Cmd<'FIRST_HALF_ENDED'>
  | Cmd<'SECOND_HALF_STARTED'>
  | Cmd<'FULL_TIME'>
  | Cmd<'MATCH_ABANDONED', { reason?: string; minute?: number }>
  | Cmd<'MATCH_POSTPONED', { reason?: string }>
  | Cmd<'GOAL_SCORED', PlayerAction>
  | Cmd<'OWN_GOAL', PlayerAction>
  | Cmd<'GOAL_CANCELED', ClubMinute>
  | Cmd<'YELLOW_CARD_GIVEN', PlayerAction>
  | Cmd<'RED_CARD_GIVEN', PlayerAction>
  | Cmd<'SUBSTITUTION', ClubMinute & { playerOutId: string; playerInId: string }>
  | Cmd<'PENALTY_AWARDED', ClubMinute>
  | Cmd<'PENALTY_SCORED', PlayerAction>
  | Cmd<'PENALTY_MISSED', PlayerAction>
  | Cmd<'VAR_CHECK_STARTED', { reason: string; minute: number }>
  | Cmd<'VAR_DECISION', { decision: string; minute: number }>
  | Cmd<'ADDED_TIME_ANNOUNCED', { addedMinutes: number }>;

export type MatchCommandType = MatchCommand['type'];
