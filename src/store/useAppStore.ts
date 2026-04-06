import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAppSlice } from './slices/app.slice';
import { createGoalSlice } from './slices/goal.slice';
import { createTransactionSlice } from './slices/transaction.slice';
import {
  APP_STORAGE_KEY,
  migratePersistedAppState,
  persistStorage,
  STORAGE_VERSION,
} from './storage';
import type { AppStore } from './types';

export const useAppStore = create<AppStore>()(
  persist(
    (...storeArgs) => ({
      ...createAppSlice(...storeArgs),
      ...createTransactionSlice(...storeArgs),
      ...createGoalSlice(...storeArgs),
    }),
    {
      name: APP_STORAGE_KEY,
      storage: persistStorage,
      version: STORAGE_VERSION,
      migrate: (persistedState, version) =>
        migratePersistedAppState(persistedState, version),
      partialize: (state) => ({
        transactionsById: state.transactionsById,
        transactionIds: state.transactionIds,
        transactionIdsByMonth: state.transactionIdsByMonth,
        transactionMonthIds: state.transactionMonthIds,
        transactionOverview: state.transactionOverview,
        notificationPermissionStatus: state.notificationPermissionStatus,
        fcmToken: state.fcmToken,
        hasRequestedNotificationPermission:
          state.hasRequestedNotificationPermission,
        goalsById: state.goalsById,
        goalIds: state.goalIds,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
