import type { GlobalAppError } from '../../types/models';
import { normalizeApiError } from '../api/request';

export function handleGlobalError(
  error: unknown,
  source: GlobalAppError['source'],
  fallbackMessage: string,
): GlobalAppError {
  const normalizedError = normalizeApiError(error, fallbackMessage);
  const payload: GlobalAppError = {
    source,
    status: normalizedError.status,
    code: normalizedError.code,
    message: normalizedError.message,
    timestamp: Date.now(),
    retryable: normalizedError.retryable,
  };

  if (__DEV__) {
    console.warn(`[error] ${source}`, payload);
  }

  return payload;
}
