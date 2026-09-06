import type { MatchStatus } from '../api';

type TagSeverity = 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast';

const STATUS: Record<MatchStatus, { label: string; severity: TagSeverity }> = {
  SCHEDULED: { label: 'Scheduled', severity: 'info' },
  IN_PROGRESS: { label: 'Live', severity: 'success' },
  HALF_TIME: { label: 'Half-time', severity: 'warn' },
  COMPLETED: { label: 'Full time', severity: 'secondary' },
  POSTPONED: { label: 'Postponed', severity: 'danger' },
  ABANDONED: { label: 'Abandoned', severity: 'danger' },
};

export function statusLabel(status: string | undefined) {
  return STATUS[status as MatchStatus]?.label ?? status ?? '';
}

export function statusSeverity(status: string | undefined): TagSeverity {
  return STATUS[status as MatchStatus]?.severity ?? 'secondary';
}
