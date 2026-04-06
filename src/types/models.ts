import type { TransactionIconKey, TransactionType } from './api';

export type GoalStatus = 'Active' | 'Planned' | 'Completed';
export type GoalIconKey = 'savings' | 'car' | 'travel' | 'home';

export interface BudgetOverviewModel {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  budget: number;
  spentPercent: number;
  note: string;
  totalBalanceLabel: string;
  totalIncomeLabel: string;
  totalExpenseLabel: string;
  budgetLabel: string;
}

export interface TransactionModel {
  id: string;
  title: string;
  notes: string;
  category: string;
  amount: number;
  type: TransactionType;
  occurredAt: string;
  timeLabel: string;
  dateLabel: string;
  metaLabel: string;
  amountLabel: string;
  isExpense: boolean;
  icon: TransactionIconKey;
  iconBackgroundColor: string;
  monthLabel: string;
}

export interface TransactionSectionModel {
  title: string;
  items: TransactionModel[];
}

export interface GoalModel {
  id: string;
  title: string;
  subtitle: string;
  targetAmount: number;
  savedAmount: number;
  monthlyTarget: number;
  deadline: string;
  status: GoalStatus;
  icon: GoalIconKey;
  accentColor: string;
  iconBackgroundColor: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
  targetAmountLabel: string;
  savedAmountLabel: string;
  leftAmountLabel: string;
  monthlyTargetLabel: string;
  deadlineLabel: string;
  projectedCompletionLabel: string;
}

export interface TrendPointModel {
  label: string;
  income: number;
  expense: number;
}

export interface GoalSummaryModel {
  totalSavedLabel: string;
  totalTargetLabel: string;
  completionPercent: number;
  activeCount: number;
  completedCount: number;
  monthlyContributionLabel: string;
}

export interface HomeDashboardModel {
  headerTitle: string;
  greeting: string;
  overview: BudgetOverviewModel;
  weeklyTrend: TrendPointModel[];
  primaryGoal: GoalModel | null;
  recentTransactions: TransactionModel[];
}

export interface CategoryBreakdownItemModel {
  category: string;
  amount: number;
  amountLabel: string;
  percent: number;
  transactionCount: number;
}

export interface InsightHighlightModel {
  title: string;
  value: string;
  helper: string;
}

export interface WeekComparisonModel {
  currentLabel: string;
  previousLabel: string;
  deltaLabel: string;
  helper: string;
  isImproving: boolean;
}

export interface InsightsDashboardModel {
  overview: BudgetOverviewModel;
  monthlyTrend: TrendPointModel[];
  summary: {
    income: number;
    expense: number;
    incomeLabel: string;
    expenseLabel: string;
  };
  highestSpendingCategory: InsightHighlightModel;
  weekComparison: WeekComparisonModel;
  dominantTransactionType: InsightHighlightModel;
  categoryBreakdown: CategoryBreakdownItemModel[];
  primaryGoal: GoalModel | null;
}

export interface GlobalAppError {
  source: 'transactions' | 'goals' | 'api';
  status: number | null;
  code: string;
  message: string;
  timestamp: number;
  retryable: boolean;
}
