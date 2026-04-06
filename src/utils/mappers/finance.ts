import { colors } from '../../theme/colors';
import type {
  TransactionDto,
  TransactionIconKey,
  TransactionMonthDto,
  TransactionType,
} from '../../types/api';
import type {
  BudgetOverviewModel,
  CategoryBreakdownItemModel,
  GoalIconKey,
  GoalModel,
  GoalStatus,
  GoalSummaryModel,
  HomeDashboardModel,
  InsightHighlightModel,
  InsightsDashboardModel,
  TransactionModel,
  TransactionSectionModel,
  TrendPointModel,
  WeekComparisonModel,
} from '../../types/models';
import { formatCurrency } from '../formatters/currency';
import {
  addDays,
  addMonths,
  createIsoDateTimeFromInput,
  formatDateInputValue,
  formatDateLabel,
  formatMonthLabel,
  formatShortDayLabel,
  formatShortMonthLabel,
  formatTimeLabel,
  formatTransactionMeta,
  getRelativeGreeting,
  startOfDay,
  startOfWeek,
} from '../formatters/date';

const CURRENT_YEAR = new Date().getFullYear();
const DEFAULT_TIME = '12:00';

type GoalInput = {
  id: string;
  title: string;
  subtitle: string;
  targetAmount: number;
  savedAmount: number;
  monthlyTarget: number;
  deadline: string;
  status: GoalStatus;
  icon: GoalIconKey;
  createdAt?: string;
  updatedAt?: string;
};

const transactionIconBackgrounds: Record<TransactionIconKey, string> = {
  salary: colors.blue300,
  groceries: colors.blue500,
  rent: colors.blue700,
  transport: colors.blue400,
  food: colors.blue300,
  travel: colors.primary500,
  car: colors.primary500,
};

const goalAccentMap: Record<
  GoalIconKey,
  { accentColor: string; iconBackgroundColor: string }
> = {
  savings: {
    accentColor: colors.primary500,
    iconBackgroundColor: colors.primary100,
  },
  car: {
    accentColor: colors.blue700,
    iconBackgroundColor: colors.blue50,
  },
  travel: {
    accentColor: colors.blue500,
    iconBackgroundColor: colors.blue50,
  },
  home: {
    accentColor: colors.surfaceDark,
    iconBackgroundColor: colors.primary100,
  },
};

function resolveLegacyOccurredAt(
  dateLabel?: string,
  timeLabel?: string,
  fallbackMonthLabel?: string,
) {
  const rawDate = `${dateLabel ?? fallbackMonthLabel ?? ''}`.trim();
  const rawTime = `${timeLabel ?? DEFAULT_TIME}`.trim();

  if (!rawDate) {
    return new Date().toISOString();
  }

  let parsed = new Date(`${rawDate}, ${CURRENT_YEAR} ${rawTime}`);

  if (Number.isNaN(parsed.getTime())) {
    const fallbackDate = createIsoDateTimeFromInput(formatDateInputValue(new Date().toISOString()));
    return fallbackDate ?? new Date().toISOString();
  }

  if (parsed.getTime() > Date.now() + 7 * 24 * 60 * 60 * 1000) {
    parsed = new Date(`${rawDate}, ${CURRENT_YEAR - 1} ${rawTime}`);
  }

  return parsed.toISOString();
}

function getTransactionIcon(category: string, type: TransactionType): TransactionIconKey {
  const normalized = category.trim().toLowerCase();

  if (normalized.includes('rent') || normalized.includes('home')) {
    return 'rent';
  }

  if (
    normalized.includes('fuel') ||
    normalized.includes('transport') ||
    normalized.includes('commute')
  ) {
    return 'transport';
  }

  if (
    normalized.includes('food') ||
    normalized.includes('dining') ||
    normalized.includes('restaurant')
  ) {
    return 'food';
  }

  if (
    normalized.includes('trip') ||
    normalized.includes('travel') ||
    normalized.includes('flight')
  ) {
    return 'travel';
  }

  if (
    normalized.includes('grocery') ||
    normalized.includes('shopping') ||
    normalized.includes('pantry')
  ) {
    return 'groceries';
  }

  if (
    normalized.includes('salary') ||
    normalized.includes('income') ||
    normalized.includes('freelance') ||
    type === 'income'
  ) {
    return 'salary';
  }

  return 'car';
}

function getGoalProgress(savedAmount: number, targetAmount: number) {
  if (targetAmount <= 0) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round((savedAmount / targetAmount) * 100)));
}

function getGoalProjectedCompletionLabel(
  savedAmount: number,
  targetAmount: number,
  monthlyTarget: number,
) {
  if (savedAmount >= targetAmount) {
    return 'Completed';
  }

  if (monthlyTarget <= 0) {
    return 'Set a monthly plan';
  }

  const monthsLeft = Math.max(1, Math.ceil((targetAmount - savedAmount) / monthlyTarget));
  return `At this pace: ${formatMonthLabel(addMonths(new Date(), monthsLeft).toISOString())}`;
}

function getGoalStatus(input: GoalInput) {
  if (input.savedAmount >= input.targetAmount) {
    return 'Completed';
  }

  return input.status;
}

function getTransactionSignedAmount(transaction: TransactionModel) {
  return transaction.type === 'expense' ? -transaction.amount : transaction.amount;
}

function sortTransactions(transactions: TransactionModel[]) {
  return [...transactions].sort(
    (left, right) =>
      new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime(),
  );
}

function sortGoals(goals: GoalModel[]) {
  const rank: Record<GoalStatus, number> = {
    Active: 0,
    Planned: 1,
    Completed: 2,
  };

  return [...goals].sort((left, right) => {
    if (rank[left.status] !== rank[right.status]) {
      return rank[left.status] - rank[right.status];
    }

    if (left.status === 'Completed' && right.status === 'Completed') {
      return left.progress - right.progress;
    }

    return (
      new Date(left.deadline).getTime() - new Date(right.deadline).getTime()
    );
  });
}

function filterExpenses(transactions: TransactionModel[]) {
  return transactions.filter((transaction) => transaction.type === 'expense');
}

function getReferenceDate(transactions: TransactionModel[], fallback = new Date()) {
  const latestTransaction = sortTransactions(transactions)[0];

  return latestTransaction ? new Date(latestTransaction.occurredAt) : fallback;
}

function getTransactionsInRange(
  transactions: TransactionModel[],
  startDate: Date,
  endDate: Date,
) {
  const startTime = startOfDay(startDate).getTime();
  const endTime = addDays(startOfDay(endDate), 1).getTime();

  return transactions.filter((transaction) => {
    const occurredAt = new Date(transaction.occurredAt).getTime();
    return occurredAt >= startTime && occurredAt < endTime;
  });
}

function buildTrendPoint(
  label: string,
  transactions: TransactionModel[],
): TrendPointModel {
  return transactions.reduce<TrendPointModel>(
    (summary, transaction) => {
      if (transaction.type === 'income') {
        summary.income += transaction.amount;
      } else {
        summary.expense += transaction.amount;
      }

      return summary;
    },
    {
      label,
      income: 0,
      expense: 0,
    },
  );
}

export function getTransactionIconBackground(icon: TransactionIconKey) {
  return transactionIconBackgrounds[icon] ?? colors.primary500;
}

export function mapBudgetOverviewFromTransactions(
  transactions: TransactionModel[],
): BudgetOverviewModel {
  const totalIncome = transactions.reduce((total, transaction) => {
    return transaction.type === 'income' ? total + transaction.amount : total;
  }, 0);
  const totalExpense = transactions.reduce((total, transaction) => {
    return transaction.type === 'expense' ? total + transaction.amount : total;
  }, 0);
  const totalBalance = totalIncome - totalExpense;
  const budget = totalIncome;
  const spentPercent = totalIncome <= 0 ? 0 : Math.min(100, Math.round((totalExpense / totalIncome) * 100));
  const note =
    transactions.length === 0
      ? 'Add a few entries to unlock your financial snapshot.'
      : totalIncome <= 0
        ? 'Track income to see your expense ratio.'
        : totalExpense <= totalIncome
          ? `${spentPercent}% of your income has been used.`
          : 'Expenses are currently above income. Review the latest activity.';

  return {
    totalBalance,
    totalIncome,
    totalExpense,
    budget,
    spentPercent,
    note,
    totalBalanceLabel: formatCurrency(totalBalance),
    totalIncomeLabel: formatCurrency(totalIncome),
    totalExpenseLabel: formatCurrency(-Math.abs(totalExpense)),
    budgetLabel: formatCurrency(budget),
  };
}

export function mapTransactionApiToModel(
  apiData: TransactionDto,
  fallbackMonthLabel?: string,
): TransactionModel {
  const occurredAt =
    apiData.occurredAt ??
    resolveLegacyOccurredAt(apiData.date, apiData.time, fallbackMonthLabel);
  const icon = apiData.icon ?? getTransactionIcon(apiData.category, apiData.type);
  const amount = Math.abs(apiData.amount);

  return {
    id: apiData.id,
    title: apiData.title,
    notes: apiData.notes ?? '',
    category: apiData.category,
    amount,
    type: apiData.type,
    occurredAt,
    timeLabel: formatTimeLabel(occurredAt),
    dateLabel: formatDateLabel(occurredAt),
    metaLabel: formatTransactionMeta(occurredAt),
    amountLabel: formatCurrency(apiData.type === 'expense' ? -amount : amount),
    isExpense: apiData.type === 'expense',
    icon,
    iconBackgroundColor: getTransactionIconBackground(icon),
    monthLabel: formatMonthLabel(occurredAt),
  };
}

export function buildTransactionModel(input: {
  id: string;
  title: string;
  notes: string;
  category: string;
  amount: number;
  type: TransactionType;
  occurredAt: string;
}): TransactionModel {
  const icon = getTransactionIcon(input.category, input.type);
  const amount = Math.abs(input.amount);

  return {
    id: input.id,
    title: input.title.trim(),
    notes: input.notes.trim(),
    category: input.category.trim(),
    amount,
    type: input.type,
    occurredAt: input.occurredAt,
    timeLabel: formatTimeLabel(input.occurredAt),
    dateLabel: formatDateLabel(input.occurredAt),
    metaLabel: formatTransactionMeta(input.occurredAt),
    amountLabel: formatCurrency(input.type === 'expense' ? -amount : amount),
    isExpense: input.type === 'expense',
    icon,
    iconBackgroundColor: getTransactionIconBackground(icon),
    monthLabel: formatMonthLabel(input.occurredAt),
  };
}

export function buildTransactionCollections(transactions: TransactionModel[]) {
  const sortedTransactions = sortTransactions(transactions);
  const transactionsById: Record<string, TransactionModel> = {};
  const transactionIds: string[] = [];
  const transactionIdsByMonth: Record<string, string[]> = {};
  const transactionMonthIds: string[] = [];

  sortedTransactions.forEach((transaction) => {
    transactionsById[transaction.id] = transaction;
    transactionIds.push(transaction.id);

    if (!transactionIdsByMonth[transaction.monthLabel]) {
      transactionIdsByMonth[transaction.monthLabel] = [];
      transactionMonthIds.push(transaction.monthLabel);
    }

    transactionIdsByMonth[transaction.monthLabel].push(transaction.id);
  });

  return {
    transactionsById,
    transactionIds,
    transactionIdsByMonth,
    transactionMonthIds,
    transactionOverview: mapBudgetOverviewFromTransactions(sortedTransactions),
  };
}

export function normalizeTransactionMonths(months: TransactionMonthDto[]) {
  const models = months.flatMap((month) =>
    month.transactions.map((transaction) =>
      mapTransactionApiToModel(transaction, month.month),
    ),
  );

  return buildTransactionCollections(models);
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

export function buildGoalModel(input: GoalInput): GoalModel {
  const status = getGoalStatus(input);
  const accent = goalAccentMap[input.icon];
  const progress = getGoalProgress(input.savedAmount, input.targetAmount);
  const leftAmount = Math.max(0, input.targetAmount - input.savedAmount);

  return {
    id: input.id,
    title: input.title.trim(),
    subtitle: input.subtitle.trim(),
    targetAmount: input.targetAmount,
    savedAmount: input.savedAmount,
    monthlyTarget: input.monthlyTarget,
    deadline: input.deadline,
    status,
    icon: input.icon,
    accentColor: accent.accentColor,
    iconBackgroundColor: accent.iconBackgroundColor,
    createdAt: input.createdAt ?? new Date().toISOString(),
    updatedAt: input.updatedAt ?? new Date().toISOString(),
    progress,
    targetAmountLabel: formatCurrency(input.targetAmount),
    savedAmountLabel: formatCurrency(input.savedAmount),
    leftAmountLabel: formatCurrency(leftAmount),
    monthlyTargetLabel: formatCurrency(input.monthlyTarget),
    deadlineLabel: formatDateLabel(input.deadline),
    projectedCompletionLabel: getGoalProjectedCompletionLabel(
      input.savedAmount,
      input.targetAmount,
      input.monthlyTarget,
    ),
  };
}

export function buildGoalCollections(goals: GoalModel[]) {
  const sortedGoals = sortGoals(goals);
  const goalsById: Record<string, GoalModel> = {};
  const goalIds: string[] = [];

  sortedGoals.forEach((goal) => {
    goalsById[goal.id] = goal;
    goalIds.push(goal.id);
  });

  return {
    goalsById,
    goalIds,
  };
}

export function getRecentTransactions(
  transactions: TransactionModel[],
  limit = 4,
) {
  return sortTransactions(transactions).slice(0, limit);
}

export function getWeeklyTrend(
  transactions: TransactionModel[],
  now = getReferenceDate(transactions),
) {
  const today = startOfDay(now);
  const days = Array.from({ length: 7 }, (_, index) => addDays(today, index - 6));

  return days.map((day) => {
    const dayTransactions = getTransactionsInRange(transactions, day, day);
    return buildTrendPoint(formatShortDayLabel(day.toISOString()), dayTransactions);
  });
}

export function getMonthlyTrend(
  transactions: TransactionModel[],
  now = getReferenceDate(transactions),
  monthCount = 4,
) {
  const startMonth = new Date(now.getFullYear(), now.getMonth() - (monthCount - 1), 1, 12);
  const months = Array.from({ length: monthCount }, (_, index) =>
    addMonths(startMonth, index),
  );

  return months.map((monthStart) => {
    const nextMonth = addMonths(monthStart, 1);
    const monthTransactions = transactions.filter((transaction) => {
      const occurredAt = new Date(transaction.occurredAt).getTime();
      return (
        occurredAt >= monthStart.getTime() && occurredAt < nextMonth.getTime()
      );
    });

    return buildTrendPoint(
      formatShortMonthLabel(monthStart.toISOString()),
      monthTransactions,
    );
  });
}

export function getExpenseCategoryBreakdown(
  transactions: TransactionModel[],
  limit = 4,
): CategoryBreakdownItemModel[] {
  const expenseTransactions = filterExpenses(transactions);
  const totalExpense = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  const grouped = expenseTransactions.reduce<
    Record<string, CategoryBreakdownItemModel>
  >((accumulator, transaction) => {
    const key = transaction.category;
    const current = accumulator[key] ?? {
      category: transaction.category,
      amount: 0,
      amountLabel: formatCurrency(0),
      percent: 0,
      transactionCount: 0,
    };

    current.amount += transaction.amount;
    current.transactionCount += 1;
    accumulator[key] = current;

    return accumulator;
  }, {});

  return Object.values(grouped)
    .map((item) => ({
      ...item,
      amountLabel: formatCurrency(-Math.abs(item.amount)),
      percent: totalExpense <= 0 ? 0 : Math.round((item.amount / totalExpense) * 100),
    }))
    .sort((left, right) => right.amount - left.amount)
    .slice(0, limit);
}

export function getPrimaryGoal(goals: GoalModel[]) {
  return sortGoals(goals).find((goal) => goal.status !== 'Completed') ?? goals[0] ?? null;
}

export function getGoalSummary(goals: GoalModel[]): GoalSummaryModel {
  const totalSaved = goals.reduce((total, goal) => total + goal.savedAmount, 0);
  const totalTarget = goals.reduce((total, goal) => total + goal.targetAmount, 0);
  const monthlyContribution = goals.reduce(
    (total, goal) => total + goal.monthlyTarget,
    0,
  );
  const activeCount = goals.filter((goal) => goal.status === 'Active').length;
  const completedCount = goals.filter((goal) => goal.status === 'Completed').length;

  return {
    totalSavedLabel: formatCurrency(totalSaved),
    totalTargetLabel: formatCurrency(totalTarget),
    completionPercent:
      totalTarget <= 0 ? 0 : Math.round((totalSaved / totalTarget) * 100),
    activeCount,
    completedCount,
    monthlyContributionLabel: formatCurrency(monthlyContribution),
  };
}

export function getGoalsByStatus(goals: GoalModel[], status: GoalStatus) {
  return sortGoals(goals).filter((goal) => goal.status === status);
}

export function getWeekComparison(
  transactions: TransactionModel[],
  now = getReferenceDate(transactions),
): WeekComparisonModel {
  const currentWeekStart = startOfWeek(now);
  const previousWeekStart = addDays(currentWeekStart, -7);
  const previousWeekEnd = addDays(currentWeekStart, -1);
  const currentWeekEnd = addDays(currentWeekStart, 6);

  const currentWeekExpense = getTransactionsInRange(
    transactions,
    currentWeekStart,
    currentWeekEnd,
  ).reduce((total, transaction) => {
    return transaction.type === 'expense' ? total + transaction.amount : total;
  }, 0);

  const previousWeekExpense = getTransactionsInRange(
    transactions,
    previousWeekStart,
    previousWeekEnd,
  ).reduce((total, transaction) => {
    return transaction.type === 'expense' ? total + transaction.amount : total;
  }, 0);

  const delta = currentWeekExpense - previousWeekExpense;
  const isImproving = delta <= 0;

  return {
    currentLabel: formatCurrency(-Math.abs(currentWeekExpense)),
    previousLabel: formatCurrency(-Math.abs(previousWeekExpense)),
    deltaLabel: formatCurrency(delta),
    helper:
      previousWeekExpense === 0
        ? 'No expense activity last week for comparison.'
        : isImproving
          ? `Down ${formatCurrency(Math.abs(delta))} compared with last week.`
          : `Up ${formatCurrency(Math.abs(delta))} compared with last week.`,
    isImproving,
  };
}

export function getHighestSpendingCategory(
  transactions: TransactionModel[],
): InsightHighlightModel {
  const topCategory = getExpenseCategoryBreakdown(transactions, 1)[0];

  if (!topCategory) {
    return {
      title: 'Highest spending category',
      value: 'No expense data yet',
      helper: 'Add expense transactions to surface category insights.',
    };
  }

  return {
    title: 'Highest spending category',
    value: topCategory.category,
    helper: `${topCategory.amountLabel} across ${topCategory.transactionCount} transactions.`,
  };
}

export function getDominantTransactionType(
  transactions: TransactionModel[],
): InsightHighlightModel {
  const incomeCount = transactions.filter(
    (transaction) => transaction.type === 'income',
  ).length;
  const expenseCount = transactions.length - incomeCount;

  if (transactions.length === 0) {
    return {
      title: 'Frequent transaction type',
      value: 'No activity yet',
      helper: 'New transactions will surface your most frequent flow.',
    };
  }

  if (incomeCount === expenseCount) {
    return {
      title: 'Frequent transaction type',
      value: 'Balanced mix',
      helper: `${incomeCount} income and ${expenseCount} expense entries so far.`,
    };
  }

  const leadingType = incomeCount > expenseCount ? 'Income entries' : 'Expense entries';
  const leadingCount = Math.max(incomeCount, expenseCount);

  return {
    title: 'Frequent transaction type',
    value: leadingType,
    helper: `${leadingCount} of ${transactions.length} transactions match this type.`,
  };
}

export function buildHomeDashboard(
  transactions: TransactionModel[],
  goals: GoalModel[],
  userName: string,
): HomeDashboardModel {
  return {
    headerTitle: `Hi ${userName}`,
    greeting: getRelativeGreeting(),
    overview: mapBudgetOverviewFromTransactions(transactions),
    weeklyTrend: getWeeklyTrend(transactions),
    primaryGoal: getPrimaryGoal(goals),
    recentTransactions: getRecentTransactions(transactions, 4),
  };
}

export function buildInsightsDashboard(
  transactions: TransactionModel[],
  goals: GoalModel[],
): InsightsDashboardModel {
  return {
    overview: mapBudgetOverviewFromTransactions(transactions),
    monthlyTrend: getMonthlyTrend(transactions),
    summary: {
      income: transactions.reduce((total, transaction) => {
        return transaction.type === 'income' ? total + transaction.amount : total;
      }, 0),
      expense: transactions.reduce((total, transaction) => {
        return transaction.type === 'expense' ? total + transaction.amount : total;
      }, 0),
      incomeLabel: formatCurrency(
        transactions.reduce((total, transaction) => {
          return transaction.type === 'income' ? total + transaction.amount : total;
        }, 0),
      ),
      expenseLabel: formatCurrency(
        -Math.abs(
          transactions.reduce((total, transaction) => {
            return transaction.type === 'expense'
              ? total + transaction.amount
              : total;
          }, 0),
        ),
      ),
    },
    highestSpendingCategory: getHighestSpendingCategory(transactions),
    weekComparison: getWeekComparison(transactions),
    dominantTransactionType: getDominantTransactionType(transactions),
    categoryBreakdown: getExpenseCategoryBreakdown(transactions),
    primaryGoal: getPrimaryGoal(goals),
  };
}

export function buildGoalInputFromModel(goal: GoalModel): GoalInput {
  return {
    id: goal.id,
    title: goal.title,
    subtitle: goal.subtitle,
    targetAmount: goal.targetAmount,
    savedAmount: goal.savedAmount,
    monthlyTarget: goal.monthlyTarget,
    deadline: goal.deadline,
    status: goal.status,
    icon: goal.icon,
    createdAt: goal.createdAt,
    updatedAt: goal.updatedAt,
  };
}

export function getGoalLeftAmount(goal: GoalModel) {
  return Math.max(0, goal.targetAmount - goal.savedAmount);
}

export function getSignedTransactionAmountLabel(transaction: TransactionModel) {
  return formatCurrency(getTransactionSignedAmount(transaction));
}
