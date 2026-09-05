import type { components, operations } from './schema';

type Schemas = components['schemas'];

export type PlayerDTO = Schemas['PlayerDTO'];
export type ClubDTO = Schemas['ClubDTO'];
export type IdResponseDTO = Schemas['IdResponseDTO'];

export type MatchResponse = Schemas['MatchResponse'];
export type MatchStateDTO = Schemas['MatchStateDTO'];
export type MatchEventDTO = Schemas['MatchEventDTO'];
export type CreateMatchRequest = Schemas['CreateMatchRequest'];
export type CreateMatchResponse = Schemas['CreateMatchResponse'];

export type MatchStatus = NonNullable<MatchResponse['status']>;
export type MatchEventType = NonNullable<MatchEventDTO['type']>;

export type ApiError = Schemas['ApiError'];
export type ApiFieldError = Schemas['ApiFieldError'];
export type ApiValidationError = Schemas['ApiValidationError'];
export type ApiTypeMismatchError = Schemas['ApiTypeMismatchError'];

export type ApiErrorBody = ApiError | ApiValidationError | ApiTypeMismatchError;

export type { operations };
