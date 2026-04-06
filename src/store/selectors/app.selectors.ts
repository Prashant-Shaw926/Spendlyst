import type { AppStore } from '../types';

export const selectHasHydrated = (state: AppStore) => state.hasHydrated;
export const selectHasInitializedData = (state: AppStore) => state.hasInitializedData;
export const selectInitializeAppData = (state: AppStore) => state.initializeAppData;
export const selectLastGlobalError = (state: AppStore) => state.lastGlobalError;
export const selectClearGlobalError = (state: AppStore) => state.clearGlobalError;
