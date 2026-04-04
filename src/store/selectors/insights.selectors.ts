import { createCachedSelector } from './helpers';
import type { AppStore } from '../types';

export const selectFetchInsights = (state: AppStore) => state.fetchInsights;

export const selectInsightsScreenState = createCachedSelector(
  (state) =>
    [state.insightsData, state.insightsStatus, state.insightsError, state.hasHydrated] as const,
  (insightsData, insightsStatus, insightsError, hasHydrated) => ({
    insightsData,
    insightsStatus,
    insightsError,
    hasHydrated,
    isInitialLoading:
      (!hasHydrated && !insightsData) ||
      (!insightsData && (insightsStatus === 'idle' || insightsStatus === 'loading')),
    isRefreshing: insightsStatus === 'refreshing',
  }),
);
