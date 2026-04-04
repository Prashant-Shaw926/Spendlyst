import type { StateCreator } from 'zustand';
import type {
  BudgetOverviewModel,
  FetchOptions,
  GlobalAppError,
  HomeModel,
  InsightsModel,
  RequestStatus,
  TransactionModel,
} from '../types/models';

export interface AppUiSlice {
  hasHydrated: boolean;
  lastGlobalError: GlobalAppError | null;
  clearGlobalError: () => void;
  setHasHydrated: (value: boolean) => void;
}

export interface HomeSlice {
  homeData: HomeModel | null;
  homeStatus: RequestStatus;
  homeError: string | null;
  homeLastFetchedAt: number | null;
  fetchHome: (options?: FetchOptions) => Promise<void>;
  resetHomeError: () => void;
}

export interface TransactionSlice {
  transactionsById: Record<string, TransactionModel>;
  transactionIds: string[];
  transactionIdsByMonth: Record<string, string[]>;
  transactionMonthIds: string[];
  transactionOverview: BudgetOverviewModel | null;
  transactionsStatus: RequestStatus;
  transactionsError: string | null;
  transactionsLastFetchedAt: number | null;
  fetchTransactions: (options?: FetchOptions) => Promise<void>;
  resetTransactionsError: () => void;
}

export interface InsightsSlice {
  insightsData: InsightsModel | null;
  insightsStatus: RequestStatus;
  insightsError: string | null;
  insightsLastFetchedAt: number | null;
  fetchInsights: (options?: FetchOptions) => Promise<void>;
  resetInsightsError: () => void;
}

export type AppStore = AppUiSlice & HomeSlice & TransactionSlice & InsightsSlice;

export type PersistedTransactionsState = Pick<
  AppStore,
  | 'transactionsById'
  | 'transactionIds'
  | 'transactionIdsByMonth'
  | 'transactionMonthIds'
  | 'transactionOverview'
  | 'transactionsLastFetchedAt'
>;

export type AppStoreSlice<T> = StateCreator<
  AppStore,
  [['zustand/persist', unknown]],
  [],
  T
>;
