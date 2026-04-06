import { mapTransactionsToSections } from '../../utils/finance';
import { createCachedSelector } from './helpers';
import type { AppStore } from '../types';

export const selectAddTransaction = (state: AppStore) => state.addTransaction;
export const selectDeleteTransaction = (state: AppStore) => state.deleteTransaction;
export const selectSeedTransactionsIfEmpty = (state: AppStore) => state.seedTransactionsIfEmpty;
export const selectUpdateTransaction = (state: AppStore) => state.updateTransaction;
export const selectTransactionOverview = (state: AppStore) => state.transactionOverview;

export const selectAllTransactions = createCachedSelector(
  (
    state,
  ): [AppStore['transactionIds'], AppStore['transactionsById']] => [
    state.transactionIds,
    state.transactionsById,
  ],
  (transactionIds, transactionsById) =>
    transactionIds
      .map((transactionId) => transactionsById[transactionId])
      .filter(Boolean),
);

export const selectTransactionSections = createCachedSelector(
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

export const selectTransactionCategories = createCachedSelector(
  (
    state,
  ): [AppStore['transactionIds'], AppStore['transactionsById']] => [
    state.transactionIds,
    state.transactionsById,
  ],
  (transactionIds, transactionsById) =>
    Array.from(
      new Set(
        transactionIds
          .map((transactionId) => transactionsById[transactionId]?.category)
          .filter(Boolean),
      ),
    ),
);

export const selectTransactionById = (transactionId?: string) => (state: AppStore) =>
  transactionId ? state.transactionsById[transactionId] ?? null : null;
