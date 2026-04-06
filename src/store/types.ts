import type { StateCreator } from 'zustand';
import type {
  BudgetOverviewModel,
  GoalIconKey,
  GoalModel,
  GoalStatus,
  GlobalAppError,
  TransactionModel,
} from '../types/models';
import type { TransactionType } from '../types/api';

export interface TransactionUpsertPayload {
  title: string;
  notes: string;
  category: string;
  amount: number;
  type: TransactionType;
  occurredAt: string;
}

export interface GoalUpsertPayload {
  title: string;
  subtitle: string;
  targetAmount: number;
  savedAmount: number;
  monthlyTarget: number;
  deadline: string;
  status: GoalStatus;
  icon: GoalIconKey;
}

export interface AppUiSlice {
  hasHydrated: boolean;
  hasInitializedData: boolean;
  lastGlobalError: GlobalAppError | null;
  clearGlobalError: () => void;
  initializeAppData: () => void;
  setHasHydrated: (value: boolean) => void;
}

export interface TransactionSlice {
  transactionsById: Record<string, TransactionModel>;
  transactionIds: string[];
  transactionIdsByMonth: Record<string, string[]>;
  transactionMonthIds: string[];
  transactionOverview: BudgetOverviewModel | null;
  seedTransactionsIfEmpty: () => void;
  addTransaction: (payload: TransactionUpsertPayload) => string;
  updateTransaction: (transactionId: string, payload: TransactionUpsertPayload) => void;
  deleteTransaction: (transactionId: string) => void;
}

export interface GoalSlice {
  goalsById: Record<string, GoalModel>;
  goalIds: string[];
  seedGoalsIfEmpty: () => void;
  addGoal: (payload: GoalUpsertPayload) => string;
  updateGoal: (goalId: string, payload: GoalUpsertPayload) => void;
  deleteGoal: (goalId: string) => void;
}

export type AppStore = AppUiSlice & TransactionSlice & GoalSlice;

export type PersistedAppState = Pick<
  AppStore,
  | 'transactionsById'
  | 'transactionIds'
  | 'transactionIdsByMonth'
  | 'transactionMonthIds'
  | 'transactionOverview'
  | 'goalsById'
  | 'goalIds'
>;

export type AppStoreSlice<T> = StateCreator<
  AppStore,
  [['zustand/persist', unknown]],
  [],
  T
>;
