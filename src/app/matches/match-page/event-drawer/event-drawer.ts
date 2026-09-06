import { ChangeDetectionStrategy, Component, computed, inject, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '@openng/optimus-ui/button';
import { Dialog } from '@openng/optimus-ui/dialog';
import { InputNumber } from '@openng/optimus-ui/inputnumber';
import { InputText } from '@openng/optimus-ui/inputtext';
import { Message } from '@openng/optimus-ui/message';
import { Select } from '@openng/optimus-ui/select';
import { SelectButton } from '@openng/optimus-ui/selectbutton';
import { firstValueFrom } from 'rxjs';
import { apiErrorMessage, ClubService, MatchService, PlayerService } from '../../../api';
import type { MatchCommand, MatchCommandType } from '../../../api';

type FieldName = 'club' | 'player' | 'sub' | 'minute' | 'reason' | 'decision' | 'addedMinutes';

interface EventOption {
  type: MatchCommandType;
  label: string;
  icon: string;
  group: string;
  fields: FieldName[];
  optional?: FieldName[];
  tone?: string;
}

const EVENT_OPTIONS: EventOption[] = [
  { type: 'GOAL_SCORED', label: 'Goal', icon: 'pi-circle-fill', group: 'Goals', fields: ['club', 'player', 'minute'] },
  { type: 'OWN_GOAL', label: 'Own goal', icon: 'pi-circle', group: 'Goals', fields: ['club', 'player', 'minute'] },
  { type: 'GOAL_CANCELED', label: 'Goal disallowed', icon: 'pi-times-circle', group: 'Goals', fields: ['club', 'minute'] },
  {
    type: 'YELLOW_CARD_GIVEN',
    label: 'Yellow card',
    icon: 'pi-bookmark-fill',
    group: 'Cards & subs',
    fields: ['club', 'player', 'minute'],
    tone: 'text-yellow-500',
  },
  {
    type: 'RED_CARD_GIVEN',
    label: 'Red card',
    icon: 'pi-bookmark-fill',
    group: 'Cards & subs',
    fields: ['club', 'player', 'minute'],
    tone: 'text-red-500',
  },
  { type: 'SUBSTITUTION', label: 'Substitution', icon: 'pi-sync', group: 'Cards & subs', fields: ['club', 'sub', 'minute'] },
  { type: 'PENALTY_AWARDED', label: 'Penalty awarded', icon: 'pi-exclamation-circle', group: 'Penalties', fields: ['club', 'minute'] },
  { type: 'PENALTY_SCORED', label: 'Penalty scored', icon: 'pi-check', group: 'Penalties', fields: ['club', 'player', 'minute'] },
  { type: 'PENALTY_MISSED', label: 'Penalty missed', icon: 'pi-times', group: 'Penalties', fields: ['club', 'player', 'minute'] },
  { type: 'MATCH_STARTED', label: 'Kick-off', icon: 'pi-play', group: 'Match flow', fields: [] },
  { type: 'FIRST_HALF_ENDED', label: 'Half-time', icon: 'pi-pause', group: 'Match flow', fields: [] },
  { type: 'SECOND_HALF_STARTED', label: 'Second half', icon: 'pi-forward', group: 'Match flow', fields: [] },
  { type: 'FULL_TIME', label: 'Full time', icon: 'pi-flag', group: 'Match flow', fields: [] },
  { type: 'ADDED_TIME_ANNOUNCED', label: 'Added time', icon: 'pi-clock', group: 'Match flow', fields: ['addedMinutes'] },
  { type: 'VAR_CHECK_STARTED', label: 'VAR check', icon: 'pi-video', group: 'Other', fields: ['reason', 'minute'] },
  { type: 'VAR_DECISION', label: 'VAR decision', icon: 'pi-check-square', group: 'Other', fields: ['decision', 'minute'] },
  {
    type: 'MATCH_ABANDONED',
    label: 'Abandoned',
    icon: 'pi-ban',
    group: 'Other',
    fields: [],
    optional: ['reason', 'minute'],
  },
  { type: 'MATCH_POSTPONED', label: 'Postponed', icon: 'pi-calendar-times', group: 'Other', fields: [], optional: ['reason'] },
];

@Component({
  selector: 'event-drawer',
  imports: [Dialog, Button, InputText, InputNumber, Select, SelectButton, Message, FormsModule],
  templateUrl: './event-drawer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDrawer {
  isVisible = model.required<boolean>();

  matchId = input.required<string>();

  homeClubName = input.required<string | undefined>();

  awayClubName = input.required<string | undefined>();

  recorded = output<void>();

  private matchService = inject(MatchService);

  private clubs = inject(ClubService).clubsResource();

  private players = inject(PlayerService).playersResource();

  groups = computed(() =>
    [...new Set(EVENT_OPTIONS.map((option) => option.group))].map((group) => ({
      group,
      options: EVENT_OPTIONS.filter((option) => option.group === group),
    })),
  );

  selected = signal<EventOption | undefined>(undefined);
  side = signal<'home' | 'away'>('home');
  minute = signal<number | null>(null);
  addedMinutes = signal<number | null>(null);
  playerId = signal<string | undefined>(undefined);
  playerOutId = signal<string | undefined>(undefined);
  playerInId = signal<string | undefined>(undefined);
  reason = signal('');
  decision = signal('');
  error = signal<string | undefined>(undefined);
  saving = signal(false);

  sideOptions = computed(() => [
    { label: this.homeClubName() ?? 'Home', value: 'home' },
    { label: this.awayClubName() ?? 'Away', value: 'away' },
  ]);

  clubId = computed(() => {
    const name = this.side() === 'home' ? this.homeClubName() : this.awayClubName();
    return this.clubs.value().find((club) => club.name === name)?.id;
  });

  squad = computed(() => {
    const club = this.clubId();
    return club ? this.players.value().filter((player) => player.club === club) : [];
  });

  needs = (field: FieldName) => {
    const option = this.selected();
    return !!option && [...option.fields, ...(option.optional ?? [])].includes(field);
  };

  command = computed<MatchCommand | undefined>(() => {
    const option = this.selected();
    if (!option) {
      return undefined;
    }
    const payload: Record<string, unknown> = { type: option.type };
    for (const field of [...option.fields, ...(option.optional ?? [])]) {
      switch (field) {
        case 'club':
          payload['clubId'] = this.clubId();
          break;
        case 'player':
          payload['playerId'] = this.playerId();
          break;
        case 'sub':
          payload['playerOutId'] = this.playerOutId();
          payload['playerInId'] = this.playerInId();
          break;
        case 'minute':
          payload['minute'] = this.minute() ?? undefined;
          break;
        case 'addedMinutes':
          payload['addedMinutes'] = this.addedMinutes() ?? undefined;
          break;
        case 'reason':
          payload['reason'] = this.reason() || undefined;
          break;
        case 'decision':
          payload['decision'] = this.decision() || undefined;
          break;
      }
    }
    return payload as MatchCommand;
  });

  valid = computed(() => {
    const option = this.selected();
    if (!option) {
      return false;
    }
    return option.fields.every((field) => {
      switch (field) {
        case 'club':
          return !!this.clubId();
        case 'player':
          return !!this.playerId();
        case 'sub':
          return !!this.playerInId() && !!this.playerOutId() && this.playerInId() !== this.playerOutId();
        case 'minute':
          return this.minute() !== null;
        case 'addedMinutes':
          return this.addedMinutes() !== null;
        case 'reason':
          return !!this.reason().trim();
        case 'decision':
          return !!this.decision().trim();
      }
    });
  });

  setSide(side: 'home' | 'away') {
    this.side.set(side);
    this.playerId.set(undefined);
    this.playerInId.set(undefined);
    this.playerOutId.set(undefined);
  }

  select(option: EventOption) {
    this.selected.set(option);
    this.error.set(undefined);
  }

  clear() {
    this.selected.set(undefined);
    this.minute.set(null);
    this.addedMinutes.set(null);
    this.playerId.set(undefined);
    this.playerInId.set(undefined);
    this.playerOutId.set(undefined);
    this.reason.set('');
    this.decision.set('');
    this.error.set(undefined);
  }

  async save() {
    const command = this.command();
    if (!command || !this.valid()) {
      return;
    }
    this.error.set(undefined);
    this.saving.set(true);
    try {
      await firstValueFrom(this.matchService.recordEvent(this.matchId(), command));
    } catch (error) {
      this.error.set(apiErrorMessage(error));
      return;
    } finally {
      this.saving.set(false);
    }
    this.clear();
    this.isVisible.set(false);
    this.recorded.emit();
  }
}
