import type { GlobalAppError } from '../types/models';
import { normalizeApiError } from '../api/client';
import type { AppStore } from './types';

export function createEntityId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function areInputsEqual(
  currentInputs: readonly unknown[],
  previousInputs: readonly unknown[],
) {
  if (currentInputs.length !== previousInputs.length) {
    return false;
  }

  return currentInputs.every((input, index) =>
    Object.is(input, previousInputs[index]),
  );
}

export function createCachedSelector<TInputs extends readonly unknown[], TResult>(
  getInputs: (state: AppStore) => TInputs,
  projector: (...inputs: TInputs) => TResult,
) {
  let hasCachedResult = false;
  let previousInputs: TInputs | null = null;
  let previousResult: TResult;

  return (state: AppStore) => {
    const currentInputs = getInputs(state);

    if (hasCachedResult && previousInputs && areInputsEqual(currentInputs, previousInputs)) {
      return previousResult;
    }

    previousInputs = currentInputs;
    previousResult = projector(...currentInputs);
    hasCachedResult = true;

    return previousResult;
  };
}

export function createGlobalAppError(
  error: unknown,
  source: GlobalAppError['source'],
  fallbackMessage: string,
): GlobalAppError {
  const normalizedError = normalizeApiError(error, fallbackMessage);

  return {
    source,
    status: normalizedError.status,
    code: normalizedError.code,
    message: normalizedError.message,
    timestamp: Date.now(),
    retryable: normalizedError.retryable,
  };
}
