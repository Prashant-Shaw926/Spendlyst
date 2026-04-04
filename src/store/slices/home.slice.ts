import { getHome } from '../../services/api/endpoints/home.api';
import { handleGlobalError } from '../../services/errors/handler';
import { mapHomeApiToModel, mapHomePreviewTransactions } from '../../utils/finance';
import { getFetchStatus, isCacheStale, mergeUniqueIds, upsertTransactionsById } from './helpers';
import type { AppStoreSlice, HomeSlice } from '../types';

export const createHomeSlice: AppStoreSlice<HomeSlice> = (set, get) => ({
  homeData: null,
  homeStatus: 'idle',
  homeError: null,
  homeLastFetchedAt: null,
  async fetchHome(options = {}) {
    const state = get();
    const hasCachedData = Boolean(state.homeData);
    const alreadyFetching = state.homeStatus === 'loading' || state.homeStatus === 'refreshing';

    if (alreadyFetching) {
      return;
    }

    if (!options.force && hasCachedData && !isCacheStale(state.homeLastFetchedAt)) {
      return;
    }

    set({
      homeStatus: getFetchStatus(hasCachedData),
      homeError: null,
    });

    try {
      const response = await getHome();
      const homeData = mapHomeApiToModel(response.data);
      const previewTransactions = mapHomePreviewTransactions(response.data.transactionsPreview);

      set((currentState) => ({
        homeData,
        homeStatus: 'success',
        homeError: null,
        homeLastFetchedAt: Date.now(),
        transactionsById: upsertTransactionsById(
          currentState.transactionsById,
          previewTransactions,
        ),
        transactionIds: mergeUniqueIds(
          currentState.transactionIds,
          previewTransactions.map((transaction) => transaction.id),
        ),
      }));
    } catch (error) {
      const globalError = handleGlobalError(error, 'home', 'Unable to load home data.');

      set({
        homeStatus: hasCachedData ? 'success' : 'error',
        homeError: hasCachedData ? null : globalError.message,
        lastGlobalError: globalError,
      });
    }
  },
  resetHomeError() {
    set({
      homeError: null,
    });
  },
});
