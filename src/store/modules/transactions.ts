import { getTransactions } from '../../api/services/transactions';
import {
  buildTransactionCollections,
  buildTransactionModel,
  normalizeTransactionMonths,
} from '../../api/mappers/finance';
import type { TransactionModel } from '../../types/models';
import type { AppStoreSlice, TransactionSlice } from '../types';
import { createEntityId, createGlobalAppError } from '../helpers';

function selectTransactions(state: {
  transactionIds: string[];
  transactionsById: Record<string, TransactionModel>;
}) {
  return state.transactionIds
    .map((transactionId) => state.transactionsById[transactionId])
    .filter(Boolean);
}

export const createTransactionModule: AppStoreSlice<TransactionSlice> = (
  set,
  get,
) => ({
  transactionsById: {},
  transactionIds: [],
  transactionIdsByMonth: {},
  transactionMonthIds: [],
  transactionOverview: null,
  transactionsStatus: 'idle',
  async fetchTransactions(params) {
    if (get().transactionsStatus === 'loading') {
      return;
    }

    set({
      transactionsStatus: 'loading',
    });

    try {
      const response = await getTransactions(params);
      const normalizedTransactions = normalizeTransactionMonths(response.data.months);

      set({
        ...normalizedTransactions,
        transactionsStatus: 'success',
        lastGlobalError: null,
      });
    } catch (error) {
      set({
        transactionsStatus: 'error',
        lastGlobalError: createGlobalAppError(
          error,
          'api',
          'Unable to load your transactions right now.',
        ),
      });
    }
  },
  addTransaction(payload) {
    const nextTransactionId = createEntityId('txn');
    const nextTransaction = buildTransactionModel({
      id: nextTransactionId,
      ...payload,
    });
    const nextTransactions = [...selectTransactions(get()), nextTransaction];

    set({
      ...buildTransactionCollections(nextTransactions),
      transactionsStatus: 'success',
      lastGlobalError: null,
    });

    return nextTransactionId;
  },
  updateTransaction(transactionId, payload) {
    const currentTransaction = get().transactionsById[transactionId];

    if (!currentTransaction) {
      return;
    }

    const nextTransactions = selectTransactions(get()).map((transaction) => {
      if (transaction.id !== transactionId) {
        return transaction;
      }

      return buildTransactionModel({
        id: transactionId,
        ...payload,
      });
    });

    set({
      ...buildTransactionCollections(nextTransactions),
      transactionsStatus: 'success',
      lastGlobalError: null,
    });
  },
  deleteTransaction(transactionId) {
    const nextTransactions = selectTransactions(get()).filter(
      (transaction) => transaction.id !== transactionId,
    );

    set({
      ...buildTransactionCollections(nextTransactions),
      transactionsStatus: 'success',
      lastGlobalError: null,
    });
  },
});
