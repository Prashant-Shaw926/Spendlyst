import { createCachedSelector, isDefined } from './helpers';
import type { AppStore } from '../types';

export const selectFetchHome = (state: AppStore) => state.fetchHome;

export const selectHomeScreenState = createCachedSelector(
  (state) =>
    [state.homeData, state.homeStatus, state.homeError, state.hasHydrated] as const,
  (homeData, homeStatus, homeError, hasHydrated) => ({
    homeData,
    homeStatus,
    homeError,
    hasHydrated,
    isInitialLoading:
      (!hasHydrated && !homeData) ||
      (!homeData && (homeStatus === 'idle' || homeStatus === 'loading')),
    isRefreshing: homeStatus === 'refreshing',
  }),
);

export const selectHomePreviewTransactions = createCachedSelector(
  (state) => [state.homeData?.previewTransactionIds, state.transactionsById] as const,
  (previewTransactionIds, transactionsById) =>
    (previewTransactionIds ?? [])
      .map((transactionId) => transactionsById[transactionId])
      .filter(isDefined),
);
