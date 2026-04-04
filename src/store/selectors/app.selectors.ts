import type { AppStore } from '../types';

export const selectHasHydrated = (state: AppStore) => state.hasHydrated;
export const selectLastGlobalError = (state: AppStore) => state.lastGlobalError;
export const selectClearGlobalError = (state: AppStore) => state.clearGlobalError;
