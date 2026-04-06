export type TransactionType = 'income' | 'expense';
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TransactionIconKey =
  | 'salary'
  | 'groceries'
  | 'rent'
  | 'transport'
  | 'food'
  | 'travel'
  | 'car';

export type InsightRange = 'Daily' | 'Weekly' | 'Monthly' | 'Year';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface RequestConfig<TData = unknown, TParams = Record<string, unknown>> {
  url: string;
  method?: ApiMethod;
  params?: TParams;
  data?: TData;
  retryCount?: number;
  retryDelayMs?: number;
}

export interface BudgetOverview {
  totalBalance: number;
  totalExpense: number;
  budget: number;
  spentPercent: number;
  note: string;
}

export interface TransactionDto {
  id: string;
  title: string;
  time?: string;
  date?: string;
  category: string;
  amount: number;
  type: TransactionType;
  icon: TransactionIconKey;
  notes?: string;
  occurredAt?: string;
}

export interface HomeData extends BudgetOverview {
  headerTitle: string;
  greeting: string;
  weekly: {
    revenue: number;
    food: number;
  };
  transactionsPreview: TransactionDto[];
}

export interface TransactionMonthDto {
  month: string;
  transactions: TransactionDto[];
}

export interface TransactionsData extends BudgetOverview {
  months: TransactionMonthDto[];
}

export interface InsightChartPoint {
  label: string;
  income: number;
  expense: number;
}

export interface InsightChartDataset {
  key: InsightRange;
  points: InsightChartPoint[];
}

export interface InsightTargetDto {
  id: string;
  label: string;
  savedAmount: number;
  goalAmount: number;
  percent: number;
}

export interface InsightsData extends BudgetOverview {
  tabs: InsightRange[];
  activeTab: InsightRange;
  chartTitle: string;
  charts: InsightChartDataset[];
  summary: {
    income: number;
    expense: number;
  };
  targets: InsightTargetDto[];
}
