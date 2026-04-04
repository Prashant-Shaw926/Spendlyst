import { colors } from '../../theme/colors';
import type {
  BudgetOverview,
  HomeData,
  InsightChartPoint,
  InsightsData,
  InsightRange,
  TransactionDto,
  TransactionIconKey,
  TransactionMonthDto,
} from '../../types/api';
import type {
  BudgetOverviewModel,
  HomeModel,
  InsightsModel,
  InsightTargetModel,
  TransactionModel,
  TransactionSectionModel,
} from '../../types/models';
import { formatCurrency } from '../formatters/currency';
import { formatDateLabel, formatTransactionMeta } from '../formatters/date';

const iconBackgrounds: Record<TransactionIconKey, string> = {
  salary: colors.blue300,
  groceries: colors.blue500,
  rent: colors.blue700,
  transport: '#2E8FFF',
  food: colors.blue300,
  travel: colors.primary500,
  car: colors.primary500,
};

export function getTransactionIconBackground(icon: TransactionIconKey) {
  return iconBackgrounds[icon] ?? colors.primary500;
}

export function mapBudgetOverviewApiToModel(
  overview: BudgetOverview,
): BudgetOverviewModel {
  return {
    ...overview,
    totalBalanceLabel: formatCurrency(overview.totalBalance),
    totalExpenseLabel: formatCurrency(-Math.abs(overview.totalExpense)),
    budgetLabel: formatCurrency(overview.budget),
  };
}

export function mapTransactionApiToModel(
  apiData: TransactionDto,
  monthLabel: string,
): TransactionModel {
  return {
    id: apiData.id,
    title: apiData.title,
    timeLabel: apiData.time,
    dateLabel: formatDateLabel(apiData.date),
    metaLabel: formatTransactionMeta(apiData.time, apiData.date),
    category: apiData.category,
    amount: apiData.amount,
    amountLabel: formatCurrency(apiData.amount),
    type: apiData.type,
    isExpense: apiData.type === 'expense',
    icon: apiData.icon,
    iconBackgroundColor: getTransactionIconBackground(apiData.icon),
    monthLabel,
  };
}

export function normalizeTransactionMonths(months: TransactionMonthDto[]) {
  const transactionsById: Record<string, TransactionModel> = {};
  const transactionIds: string[] = [];
  const transactionIdsByMonth: Record<string, string[]> = {};
  const transactionMonthIds: string[] = [];

  months.forEach((month) => {
    transactionMonthIds.push(month.month);

    transactionIdsByMonth[month.month] = month.transactions.map((transaction) => {
      const model = mapTransactionApiToModel(transaction, month.month);
      transactionsById[model.id] = model;

      if (!transactionIds.includes(model.id)) {
        transactionIds.push(model.id);
      }

      return model.id;
    });
  });

  return {
    transactionsById,
    transactionIds,
    transactionIdsByMonth,
    transactionMonthIds,
  };
}

export function mapHomeApiToModel(apiData: HomeData): HomeModel {
  const previewTransactions = mapHomePreviewTransactions(apiData.transactionsPreview);

  return {
    headerTitle: apiData.headerTitle,
    greeting: apiData.greeting,
    overview: mapBudgetOverviewApiToModel(apiData),
    weekly: {
      revenue: apiData.weekly.revenue,
      revenueLabel: formatCurrency(apiData.weekly.revenue),
      food: apiData.weekly.food,
      foodLabel: formatCurrency(apiData.weekly.food),
    },
    previewTransactionIds: previewTransactions.map((transaction) => transaction.id),
  };
}

export function mapHomePreviewTransactions(transactions: TransactionDto[]) {
  return transactions.map((transaction) => mapTransactionApiToModel(transaction, 'Preview'));
}

export function mapInsightTargetApiToModel(
  target: InsightsData['targets'][number],
): InsightTargetModel {
  return {
    ...target,
    savedAmountLabel: formatCurrency(target.savedAmount),
    goalAmountLabel: formatCurrency(target.goalAmount),
  };
}

export function mapInsightsApiToModel(apiData: InsightsData): InsightsModel {
  const chartsByRange = apiData.charts.reduce<Record<InsightRange, InsightChartPoint[]>>(
    (accumulator, chart) => {
      accumulator[chart.key] = chart.points;
      return accumulator;
    },
    {
      Daily: [],
      Weekly: [],
      Monthly: [],
      Year: [],
    },
  );

  return {
    overview: mapBudgetOverviewApiToModel(apiData),
    tabs: apiData.tabs,
    activeTab: apiData.activeTab,
    chartTitle: apiData.chartTitle,
    chartsByRange,
    summary: {
      income: apiData.summary.income,
      expense: apiData.summary.expense,
      incomeLabel: formatCurrency(apiData.summary.income),
      expenseLabel: formatCurrency(apiData.summary.expense),
    },
    targets: apiData.targets.map(mapInsightTargetApiToModel),
  };
}

export function mapTransactionsToSections(
  monthIds: string[],
  transactionIdsByMonth: Record<string, string[]>,
  transactionsById: Record<string, TransactionModel>,
): TransactionSectionModel[] {
  return monthIds.map((monthId) => ({
    title: monthId,
    items: (transactionIdsByMonth[monthId] ?? [])
      .map((transactionId) => transactionsById[transactionId])
      .filter(Boolean),
  }));
}

export function getInsightChartData(
  insights: InsightsModel | null,
  activeTab: InsightRange,
): InsightChartPoint[] {
  if (!insights) {
    return [];
  }

  return insights.chartsByRange[activeTab] ?? insights.chartsByRange[insights.activeTab] ?? [];
}
