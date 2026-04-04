import type { AppStore } from '../types';

function areInputsEqual(currentInputs: readonly unknown[], previousInputs: readonly unknown[]) {
  if (currentInputs.length !== previousInputs.length) {
    return false;
  }

  return currentInputs.every((input, index) => Object.is(input, previousInputs[index]));
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

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
