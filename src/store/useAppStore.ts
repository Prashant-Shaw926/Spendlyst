import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAppSlice } from './slices/app.slice';
import { createHomeSlice } from './slices/home.slice';
import { createInsightsSlice } from './slices/insights.slice';
import { createTransactionSlice } from './slices/transaction.slice';
import {
  migratePersistedTransactionsState,
  persistStorage,
  STORAGE_VERSION,
  TRANSACTION_STORAGE_KEY,
} from './storage';
import type { AppStore } from './types';

export const useAppStore = create<AppStore>()(
  persist(
    (...storeArgs) => ({
      ...createAppSlice(...storeArgs),
      ...createTransactionSlice(...storeArgs),
      ...createHomeSlice(...storeArgs),
      ...createInsightsSlice(...storeArgs),
    }),
    {
      name: TRANSACTION_STORAGE_KEY,
      storage: persistStorage,
      version: STORAGE_VERSION,
      migrate: (persistedState, version) =>
        migratePersistedTransactionsState(persistedState, version),
      partialize: (state) => ({
        transactionsById: state.transactionsById,
        transactionIds: state.transactionIds,
        transactionIdsByMonth: state.transactionIdsByMonth,
        transactionMonthIds: state.transactionMonthIds,
        transactionOverview: state.transactionOverview,
        transactionsLastFetchedAt: state.transactionsLastFetchedAt,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
