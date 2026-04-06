import type { AppStoreSlice, AppUiSlice } from '../types';

export const createAppSlice: AppStoreSlice<AppUiSlice> = (set, get) => ({
  hasHydrated: false,
  hasInitializedData: false,
  lastGlobalError: null,
  clearGlobalError() {
    set({
      lastGlobalError: null,
    });
  },
  initializeAppData() {
    const state = get();

    if (state.hasInitializedData) {
      return;
    }

    state.seedTransactionsIfEmpty();
    state.seedGoalsIfEmpty();

    set({
      hasInitializedData: true,
    });
  },
  setHasHydrated(value) {
    set({
      hasHydrated: value,
    });
  },
});
