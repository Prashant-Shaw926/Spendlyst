import { buildHomeDashboard } from '../../utils/finance';
import { createCachedSelector } from './helpers';
import type { AppStore } from '../types';

export const selectHomeDashboard = createCachedSelector(
  (
    state,
  ): [AppStore['transactionIds'], AppStore['transactionsById'], AppStore['goalIds'], AppStore['goalsById'], AppStore['userName']] => [
    state.transactionIds,
    state.transactionsById,
    state.goalIds,
    state.goalsById,
    state.userName,
  ],
  (transactionIds, transactionsById, goalIds, goalsById, userName) => {
    const transactions = transactionIds
      .map((transactionId) => transactionsById[transactionId])
      .filter(Boolean);
    const goals = goalIds.map((goalId) => goalsById[goalId]).filter(Boolean);

    return buildHomeDashboard(transactions, goals, userName);
  },
);
