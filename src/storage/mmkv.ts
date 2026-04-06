import { createMMKV } from 'react-native-mmkv';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';
import type { TransactionsData } from '../types/api';
import { normalizeTransactionMonths } from '../api/mappers/finance';
import type { PersistedAppState } from '../store/types';

export const storage = createMMKV({
  id: 'spendlyst-storage',
});

const mmkvStateStorage: StateStorage = {
  getItem: (name) => storage.getString(name) ?? null,
  setItem: (name, value) => {
    storage.set(name, value);
  },
  removeItem: (name) => {
    storage.remove(name);
  },
};

export const persistStorage = createJSONStorage(() => mmkvStateStorage);
export const STORAGE_VERSION = 3;
export const APP_STORAGE_KEY = 'spendlyst-store';

export const EMPTY_PERSISTED_APP_STATE: PersistedAppState = {
  transactionsById: {},
  transactionIds: [],
  transactionIdsByMonth: {},
  transactionMonthIds: [],
  transactionOverview: null,
  notificationPermissionStatus: 'not-determined',
  fcmToken: null,
  hasRequestedNotificationPermission: false,
  goalsById: {},
  goalIds: [],
};

function normalizeLegacyTransactionsState(
  data: TransactionsData,
): PersistedAppState {
  const normalizedTransactions = normalizeTransactionMonths(data.months);

  return {
    ...EMPTY_PERSISTED_APP_STATE,
    ...normalizedTransactions,
  };
}

export function migratePersistedAppState(
  persistedState: unknown,
  version: number,
): PersistedAppState {
  if (!persistedState || typeof persistedState !== 'object') {
    return EMPTY_PERSISTED_APP_STATE;
  }

  if (version === 0 && 'data' in persistedState) {
    const legacyState = persistedState as {
      data?: TransactionsData | null;
    };

    if (!legacyState.data) {
      return EMPTY_PERSISTED_APP_STATE;
    }

    return normalizeLegacyTransactionsState(legacyState.data);
  }

  const nextState = persistedState as Partial<PersistedAppState>;

  return {
    transactionsById: nextState.transactionsById ?? {},
    transactionIds: nextState.transactionIds ?? [],
    transactionIdsByMonth: nextState.transactionIdsByMonth ?? {},
    transactionMonthIds: nextState.transactionMonthIds ?? [],
    transactionOverview: nextState.transactionOverview ?? null,
    notificationPermissionStatus:
      nextState.notificationPermissionStatus ?? 'not-determined',
    fcmToken: nextState.fcmToken ?? null,
    hasRequestedNotificationPermission:
      nextState.hasRequestedNotificationPermission ?? false,
    goalsById: nextState.goalsById ?? {},
    goalIds: nextState.goalIds ?? [],
  };
}
