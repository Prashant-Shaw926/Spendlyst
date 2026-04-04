import { mapTransactionsToSections } from '../../utils/finance';
import { createCachedSelector } from './helpers';
import type { AppStore } from '../types';

export const selectFetchTransactions = (state: AppStore) => state.fetchTransactions;

export const selectTransactionsByMonth = createCachedSelector(
  (
    state,
  ): [
    AppStore['transactionMonthIds'],
    AppStore['transactionIdsByMonth'],
    AppStore['transactionsById'],
  ] => [
    state.transactionMonthIds,
    state.transactionIdsByMonth,
    state.transactionsById,
  ],
  (transactionMonthIds, transactionIdsByMonth, transactionsById) =>
    mapTransactionsToSections(
      transactionMonthIds,
      transactionIdsByMonth,
      transactionsById,
    ),
);

export const selectTransactionsScreenState = createCachedSelector(
  (
    state,
  ): [
    AppStore['transactionOverview'],
    AppStore['transactionsStatus'],
    AppStore['transactionsError'],
    AppStore['hasHydrated'],
    AppStore['transactionIds'],
  ] => [
    state.transactionOverview,
    state.transactionsStatus,
    state.transactionsError,
    state.hasHydrated,
    state.transactionIds,
  ],
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
