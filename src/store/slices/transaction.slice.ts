import transactionsSeed from '../../services/mock/transactions.json';
import type { TransactionMonthDto } from '../../types/api';
import {
  buildTransactionCollections,
  buildTransactionModel,
  normalizeTransactionMonths,
} from '../../utils/finance';
import type { TransactionModel } from '../../types/models';
import type { AppStoreSlice, TransactionSlice } from '../types';
import { createEntityId } from './helpers';

function selectTransactions(state: {
  transactionIds: string[];
  transactionsById: Record<string, TransactionModel>;
}) {
  return state.transactionIds
    .map((transactionId) => state.transactionsById[transactionId])
    .filter(Boolean);
}

export const createTransactionSlice: AppStoreSlice<TransactionSlice> = (set, get) => ({
  transactionsById: {},
  transactionIds: [],
  transactionIdsByMonth: {},
  transactionMonthIds: [],
  transactionOverview: null,
  seedTransactionsIfEmpty() {
    if (get().transactionIds.length > 0) {
      return;
    }

    const seededCollections = normalizeTransactionMonths(
      transactionsSeed.data.months as TransactionMonthDto[],
    );

    set({
      ...seededCollections,
    });
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
    });
  },
  deleteTransaction(transactionId) {
    const nextTransactions = selectTransactions(get()).filter(
      (transaction) => transaction.id !== transactionId,
    );

    set({
      ...buildTransactionCollections(nextTransactions),
    });
  },
});
