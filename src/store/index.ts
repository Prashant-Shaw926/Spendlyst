import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  buildHomeDashboard,
  buildInsightsDashboard,
  getGoalSummary,
  getGoalsByStatus,
  mapTransactionsToSections,
} from '../api/mappers/finance';
import {
  APP_STORAGE_KEY,
  migratePersistedAppState,
  persistStorage,
  STORAGE_VERSION,
} from '../storage/mmkv';
import type { GoalStatus } from '../types/models';
import { createCachedSelector } from './helpers';
import { createAppModule } from './modules/app';
import { createGoalModule } from './modules/goals';
import { createTransactionModule } from './modules/transactions';
import type { AppStore } from './types';

export const useAppStore = create<AppStore>()(
  persist(
    (...storeArgs) => ({
      ...createAppModule(...storeArgs),
      ...createTransactionModule(...storeArgs),
      ...createGoalModule(...storeArgs),
    }),
    {
      name: APP_STORAGE_KEY,
      storage: persistStorage,
      version: STORAGE_VERSION,
      migrate: (persistedState, version) =>
        migratePersistedAppState(persistedState, version),
      partialize: (state) => ({
        transactionsById: state.transactionsById,
        transactionIds: state.transactionIds,
        transactionIdsByMonth: state.transactionIdsByMonth,
        transactionMonthIds: state.transactionMonthIds,
        transactionOverview: state.transactionOverview,
        notificationPermissionStatus: state.notificationPermissionStatus,
        fcmToken: state.fcmToken,
        hasRequestedNotificationPermission:
          state.hasRequestedNotificationPermission,
        goalsById: state.goalsById,
        goalIds: state.goalIds,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export const selectHasHydrated = (state: AppStore) => state.hasHydrated;
export const selectHasInitializedData = (state: AppStore) =>
  state.hasInitializedData;
export const selectInitializeAppData = (state: AppStore) =>
  state.initializeAppData;
export const selectLastGlobalError = (state: AppStore) => state.lastGlobalError;
export const selectClearGlobalError = (state: AppStore) => state.clearGlobalError;
export const selectAddGoal = (state: AppStore) => state.addGoal;
export const selectDeleteGoal = (state: AppStore) => state.deleteGoal;
export const selectUpdateGoal = (state: AppStore) => state.updateGoal;
export const selectAddTransaction = (state: AppStore) => state.addTransaction;
export const selectDeleteTransaction = (state: AppStore) =>
  state.deleteTransaction;
export const selectUpdateTransaction = (state: AppStore) =>
  state.updateTransaction;
export const selectFetchTransactions = (state: AppStore) =>
  state.fetchTransactions;
export const selectTransactionOverview = (state: AppStore) =>
  state.transactionOverview;
export const selectTransactionsStatus = (state: AppStore) =>
  state.transactionsStatus;

export const selectAllTransactions = createCachedSelector(
  (state): [AppStore['transactionIds'], AppStore['transactionsById']] => [
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
  (state): [AppStore['transactionIds'], AppStore['transactionsById']] => [
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

export const selectAllGoals = createCachedSelector(
  (state): [AppStore['goalIds'], AppStore['goalsById']] => [
    state.goalIds,
    state.goalsById,
  ],
  (goalIds, goalsById) => goalIds.map((goalId) => goalsById[goalId]).filter(Boolean),
);

export const selectGoalSummary = createCachedSelector(
  (state): [AppStore['goalIds'], AppStore['goalsById']] => [
    state.goalIds,
    state.goalsById,
  ],
  (goalIds, goalsById) =>
    getGoalSummary(goalIds.map((goalId) => goalsById[goalId]).filter(Boolean)),
);

export const selectGoalsByStatus = (status: GoalStatus) =>
  createCachedSelector(
    (state): [AppStore['goalIds'], AppStore['goalsById']] => [
      state.goalIds,
      state.goalsById,
    ],
    (goalIds, goalsById) =>
      getGoalsByStatus(
        goalIds.map((goalId) => goalsById[goalId]).filter(Boolean),
        status,
      ),
  );

export const selectGoalById = (goalId?: string) => (state: AppStore) =>
  goalId ? state.goalsById[goalId] ?? null : null;

export const selectHomeDashboard = createCachedSelector(
  (
    state,
  ): [
    AppStore['transactionIds'],
    AppStore['transactionsById'],
    AppStore['goalIds'],
    AppStore['goalsById'],
    AppStore['userName'],
  ] => [
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

export const selectInsightsDashboard = createCachedSelector(
  (
    state,
  ): [
    AppStore['transactionIds'],
    AppStore['transactionsById'],
    AppStore['goalIds'],
    AppStore['goalsById'],
  ] => [
    state.transactionIds,
    state.transactionsById,
    state.goalIds,
    state.goalsById,
  ],
  (transactionIds, transactionsById, goalIds, goalsById) => {
    const transactions = transactionIds
      .map((transactionId) => transactionsById[transactionId])
      .filter(Boolean);
    const goals = goalIds.map((goalId) => goalsById[goalId]).filter(Boolean);

    return buildInsightsDashboard(transactions, goals);
  },
);
