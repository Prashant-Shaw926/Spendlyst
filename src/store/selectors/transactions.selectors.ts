import { mapTransactionsToSections } from '../../utils/finance';
import { createCachedSelector } from './helpers';
import type { AppStore } from '../types';

export const selectFetchTransactions = (state: AppStore) => state.fetchTransactions;

export const selectTransactionsByMonth = createCachedSelector(
  (state) =>
    [state.transactionMonthIds, state.transactionIdsByMonth, state.transactionsById] as const,
  (transactionMonthIds, transactionIdsByMonth, transactionsById) =>
    mapTransactionsToSections(
      transactionMonthIds,
      transactionIdsByMonth,
      transactionsById,
    ),
);

export const selectTransactionsScreenState = createCachedSelector(
  (state) =>
    [
      state.transactionOverview,
      state.transactionsStatus,
      state.transactionsError,
      state.hasHydrated,
      state.transactionIds,
    ] as const,
  (
    transactionOverview,
    transactionsStatus,
    transactionsError,
    hasHydrated,
    transactionIds,
  ) => ({
    transactionOverview,
    transactionsStatus,
    transactionsError,
    hasHydrated,
    hasTransactions: transactionIds.length > 0,
    isInitialLoading:
      (!hasHydrated && transactionIds.length === 0) ||
      (transactionIds.length === 0 &&
        (transactionsStatus === 'idle' || transactionsStatus === 'loading')),
    isRefreshing: transactionsStatus === 'refreshing',
  }),
);
