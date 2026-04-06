import type { AppStoreSlice, AppUiSlice } from '../types';

export const createAppModule: AppStoreSlice<AppUiSlice> = (set, get) => ({
  hasHydrated: false,
  hasInitializedData: false,
  isInitializingApp: false,
  lastGlobalError: null,
  notificationPermissionStatus: 'not-determined',
  fcmToken: null,
  hasRequestedNotificationPermission: false,
  userName: 'John Smith',
  clearGlobalError() {
    set({
      lastGlobalError: null,
    });
  },
  async initializeAppData() {
    const state = get();

    if (state.hasInitializedData || state.isInitializingApp) {
      return;
    }

    set({
      isInitializingApp: true,
    });

    try {
      state.seedGoalsIfEmpty();

      if (get().transactionIds.length === 0) {
        await state.fetchTransactions();
      }
    } finally {
      set({
        hasInitializedData: true,
        isInitializingApp: false,
      });
    }
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
  setUserName(name) {
    set({
      userName: name,
    });
  },
});
