import type { AppStoreSlice, AppUiSlice } from '../types';

export const createAppSlice: AppStoreSlice<AppUiSlice> = (set, get) => ({
  hasHydrated: false,
  hasInitializedData: false,
  lastGlobalError: null,
  notificationPermissionStatus: 'not-determined',
  fcmToken: null,
  hasRequestedNotificationPermission: false,
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
  setHasRequestedNotificationPermission(value) {
    set({
      hasRequestedNotificationPermission: value,
    });
  },
  setNotificationPermissionStatus(value) {
    set({
      notificationPermissionStatus: value,
    });
  },
  setFcmToken(value) {
    set({
      fcmToken: value,
    });
  },
});
