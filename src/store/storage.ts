import { createMMKV } from 'react-native-mmkv';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';
import type { TransactionsData } from '../types/api';
import { mapBudgetOverviewApiToModel, normalizeTransactionMonths } from '../utils/finance';
import type { PersistedTransactionsState } from './types';

export const storage = createMMKV({
  id: 'spendlyst-storage',
});

const mmkvStateStorage: StateStorage = {
  getItem: (name) => {
    return storage.getString(name) ?? null;
  },
  setItem: (name, value) => {
    storage.set(name, value);
  },
  removeItem: (name) => {
    storage.remove(name);
  },
};

export const persistStorage = createJSONStorage(() => mmkvStateStorage);
export const STORAGE_VERSION = 1;
export const TRANSACTION_STORAGE_KEY = 'transaction-store';

export const EMPTY_PERSISTED_TRANSACTIONS_STATE: PersistedTransactionsState = {
  transactionsById: {},
  transactionIds: [],
  transactionIdsByMonth: {},
  transactionMonthIds: [],
  transactionOverview: null,
  transactionsLastFetchedAt: null,
};

function normalizeLegacyTransactionsState(
  data: TransactionsData,
): PersistedTransactionsState {
  const normalizedTransactions = normalizeTransactionMonths(data.months);

  return {
    ...normalizedTransactions,
    transactionOverview: mapBudgetOverviewApiToModel(data),
    transactionsLastFetchedAt: null,
  };
}

export function migratePersistedTransactionsState(
  persistedState: unknown,
  version: number,
): PersistedTransactionsState {
  if (!persistedState || typeof persistedState !== 'object') {
    return EMPTY_PERSISTED_TRANSACTIONS_STATE;
  }

  if (version === 0 && 'data' in persistedState) {
    const legacyState = persistedState as {
      data?: TransactionsData | null;
    };

    if (!legacyState.data) {
      return EMPTY_PERSISTED_TRANSACTIONS_STATE;
    }

    return normalizeLegacyTransactionsState(legacyState.data);
  }

  const nextState = persistedState as Partial<PersistedTransactionsState>;

  return {
    transactionsById: nextState.transactionsById ?? {},
    transactionIds: nextState.transactionIds ?? [],
    transactionIdsByMonth: nextState.transactionIdsByMonth ?? {},
    transactionMonthIds: nextState.transactionMonthIds ?? [],
    transactionOverview: nextState.transactionOverview ?? null,
    transactionsLastFetchedAt: nextState.transactionsLastFetchedAt ?? null,
  };
}
