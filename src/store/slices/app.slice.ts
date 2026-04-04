import type { AppStoreSlice, AppUiSlice } from '../types';

export const createAppSlice: AppStoreSlice<AppUiSlice> = (set) => ({
  hasHydrated: false,
  lastGlobalError: null,
  clearGlobalError() {
    set({
      lastGlobalError: null,
    });
  },
  setHasHydrated(value) {
    set({
      hasHydrated: value,
    });
  },
});
