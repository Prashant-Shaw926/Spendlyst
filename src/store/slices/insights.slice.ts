import { getInsights } from '../../services/api/endpoints/insights.api';
import { handleGlobalError } from '../../services/errors/handler';
import { mapInsightsApiToModel } from '../../utils/finance';
import { getFetchStatus, isCacheStale } from './helpers';
import type { AppStoreSlice, InsightsSlice } from '../types';

export const createInsightsSlice: AppStoreSlice<InsightsSlice> = (set, get) => ({
  insightsData: null,
  insightsStatus: 'idle',
  insightsError: null,
  insightsLastFetchedAt: null,
  async fetchInsights(options = {}) {
    const state = get();
    const hasCachedData = Boolean(state.insightsData);
    const alreadyFetching =
      state.insightsStatus === 'loading' || state.insightsStatus === 'refreshing';

    if (alreadyFetching) {
      return;
    }

    if (
      !options.force &&
      hasCachedData &&
      !isCacheStale(state.insightsLastFetchedAt)
    ) {
      return;
    }

    set({
      insightsStatus: getFetchStatus(hasCachedData),
      insightsError: null,
    });

    try {
      const response = await getInsights();

      set({
        insightsData: mapInsightsApiToModel(response.data),
        insightsStatus: 'success',
        insightsError: null,
        insightsLastFetchedAt: Date.now(),
      });
    } catch (error) {
      const globalError = handleGlobalError(
        error,
        'insights',
        'Unable to load insights.',
      );

      set({
        insightsStatus: hasCachedData ? 'success' : 'error',
        insightsError: hasCachedData ? null : globalError.message,
        lastGlobalError: globalError,
      });
    }
  },
  resetInsightsError() {
    set({
      insightsError: null,
    });
  },
});
