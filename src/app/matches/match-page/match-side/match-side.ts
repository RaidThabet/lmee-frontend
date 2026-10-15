import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Skeleton } from '@openng/optimus-ui/skeleton';
import { Tag } from '@openng/optimus-ui/tag';
import { NgOptimizedImage } from '@angular/common';
import { DEFAULT_CLUB_CREST_URL } from '../../../api';

@Component({
  selector: 'match-side',
  imports: [Skeleton, Tag, NgOptimizedImage],
  templateUrl: './match-side.html',
  styleUrl: './match-side.css',
  host: { class: 'block min-w-0 flex-1' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchSide {
  protected readonly defaultCrest = DEFAULT_CLUB_CREST_URL;

  clubName = input.required<string | undefined>();

  clubCrestUrl = input.required<string | undefined>();

  reds = input.required<number | undefined>();

  yellows = input.required<number | undefined>();

  subs = input.required<number | undefined>();

  loaded = computed(
    () =>
      this.clubName() !== undefined &&
      this.reds() !== undefined &&
      this.yellows() !== undefined &&
      this.subs() !== undefined,
  );
}
