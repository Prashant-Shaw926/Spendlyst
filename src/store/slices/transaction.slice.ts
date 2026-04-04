import { getTransactions } from '../../services/api/endpoints/transaction.api';
import { handleGlobalError } from '../../services/errors/handler';
import {
  mapBudgetOverviewApiToModel,
  normalizeTransactionMonths,
} from '../../utils/finance';
import { getFetchStatus, isCacheStale } from './helpers';
import type { AppStoreSlice, TransactionSlice } from '../types';

export const createTransactionSlice: AppStoreSlice<TransactionSlice> = (set, get) => ({
  transactionsById: {},
  transactionIds: [],
  transactionIdsByMonth: {},
  transactionMonthIds: [],
  transactionOverview: null,
  transactionsStatus: 'idle',
  transactionsError: null,
  transactionsLastFetchedAt: null,
  async fetchTransactions(options = {}) {
    const state = get();
    const hasCachedData = state.transactionIds.length > 0;
    const alreadyFetching =
      state.transactionsStatus === 'loading' || state.transactionsStatus === 'refreshing';

    if (alreadyFetching) {
      return;
    }

    if (
      !options.force &&
      hasCachedData &&
      !isCacheStale(state.transactionsLastFetchedAt)
    ) {
      return;
    }

    set({
      transactionsStatus: getFetchStatus(hasCachedData),
      transactionsError: null,
    });

    try {
      const response = await getTransactions();
      const normalizedTransactions = normalizeTransactionMonths(response.data.months);

      set({
        ...normalizedTransactions,
        transactionOverview: mapBudgetOverviewApiToModel(response.data),
        transactionsStatus: 'success',
        transactionsError: null,
        transactionsLastFetchedAt: Date.now(),
      });
    } catch (error) {
      const globalError = handleGlobalError(
        error,
        'transactions',
        'Unable to load transactions.',
      );

      set({
        transactionsStatus: hasCachedData ? 'success' : 'error',
        transactionsError: hasCachedData ? null : globalError.message,
        lastGlobalError: globalError,
      });
    }
  },
  resetTransactionsError() {
    set({
      transactionsError: null,
    });
  },
});
