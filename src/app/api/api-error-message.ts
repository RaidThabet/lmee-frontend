import { HttpErrorResponse } from '@angular/common/http';
import type { ApiErrorBody } from './models';

export function apiErrorMessage(error: unknown) {
  if (error instanceof HttpErrorResponse) {
    const body = error.error as ApiErrorBody | null;
    return body?.message ?? `Request failed with status ${error.status}`;
  }

  return 'Request failed';
}
