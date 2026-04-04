import type {
  InsightChartPoint,
  InsightRange,
  TransactionIconKey,
  TransactionType,
} from './api';

export type RequestStatus = 'idle' | 'loading' | 'refreshing' | 'success' | 'error';

export interface BudgetOverviewModel {
  totalBalance: number;
  totalExpense: number;
  budget: number;
  spentPercent: number;
  note: string;
  totalBalanceLabel: string;
  totalExpenseLabel: string;
  budgetLabel: string;
}

export interface TransactionModel {
  id: string;
  title: string;
  timeLabel: string;
  dateLabel: string;
  metaLabel: string;
  category: string;
  amount: number;
  amountLabel: string;
  type: TransactionType;
  isExpense: boolean;
  icon: TransactionIconKey;
  iconBackgroundColor: string;
  monthLabel: string;
}

export interface TransactionSectionModel {
  title: string;
  items: TransactionModel[];
}

export interface HomeModel {
  headerTitle: string;
  greeting: string;
  overview: BudgetOverviewModel;
  weekly: {
    revenue: number;
    revenueLabel: string;
    food: number;
    foodLabel: string;
  };
  previewTransactionIds: string[];
}

export interface InsightTargetModel {
  id: string;
  label: string;
  savedAmount: number;
  goalAmount: number;
  percent: number;
  savedAmountLabel: string;
  goalAmountLabel: string;
}

export interface InsightsModel {
  overview: BudgetOverviewModel;
  tabs: InsightRange[];
  activeTab: InsightRange;
  chartTitle: string;
  chartsByRange: Record<InsightRange, InsightChartPoint[]>;
  summary: {
    income: number;
    expense: number;
    incomeLabel: string;
    expenseLabel: string;
  };
  targets: InsightTargetModel[];
}

export interface GlobalAppError {
  source: 'home' | 'transactions' | 'insights' | 'api';
  status: number | null;
  code: string;
  message: string;
  timestamp: number;
  retryable: boolean;
}

export interface FetchOptions {
  force?: boolean;
}
