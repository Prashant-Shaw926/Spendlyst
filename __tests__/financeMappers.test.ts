import {
  buildGoalModel,
  buildHomeDashboard,
  buildInsightsDashboard,
  mapBudgetOverviewFromTransactions,
  mapTransactionApiToModel,
  normalizeTransactionMonths,
} from '../src/api/mappers/finance';
import type { TransactionDto, TransactionMonthDto } from '../src/types/api';

describe('finance mappers and dashboard builders', () => {
  it('maps transaction DTOs into richer UI-ready models', () => {
    const apiTransaction: TransactionDto = {
      id: 'txn_demo',
      title: 'Groceries',
      category: 'Pantry',
      amount: -100,
      type: 'expense',
      icon: 'groceries',
      notes: 'Weekly restock',
      occurredAt: '2026-04-24T17:00:00.000Z',
    };

    expect(mapTransactionApiToModel(apiTransaction)).toEqual(
      expect.objectContaining({
        id: 'txn_demo',
        notes: 'Weekly restock',
        amount: 100,
        amountLabel: '-$100.00',
        isExpense: true,
        monthLabel: 'April 2026',
      }),
    );
  });

  it('normalizes monthly transaction groups into ids, entities, and overview totals', () => {
    const months: TransactionMonthDto[] = [
      {
        month: 'April',
        transactions: [
          {
            id: 'txn_1',
            title: 'Salary',
            category: 'Salary',
            amount: 4000,
            type: 'income',
            icon: 'salary',
            occurredAt: '2026-04-01T09:00:00.000Z',
          },
        ],
      },
    ];

    expect(normalizeTransactionMonths(months)).toEqual({
      transactionsById: {
        txn_1: expect.objectContaining({
          id: 'txn_1',
          monthLabel: 'April 2026',
        }),
      },
      transactionIds: ['txn_1'],
      transactionIdsByMonth: {
        'April 2026': ['txn_1'],
      },
      transactionMonthIds: ['April 2026'],
      transactionOverview: expect.objectContaining({
        totalIncomeLabel: '$4,000.00',
      }),
    });
  });

  it('builds derived home and insights data from shared transactions and goals', () => {
    const salary = mapTransactionApiToModel({
      id: 'txn_salary',
      title: 'Salary',
      category: 'Salary',
      amount: 4200,
      type: 'income',
      icon: 'salary',
      occurredAt: '2026-04-01T09:00:00.000Z',
    });
    const groceries = mapTransactionApiToModel({
      id: 'txn_groceries',
      title: 'Groceries',
      category: 'Groceries',
      amount: -220,
      type: 'expense',
      icon: 'groceries',
      occurredAt: '2026-04-04T18:30:00.000Z',
    });
    const fuel = mapTransactionApiToModel({
      id: 'txn_fuel',
      title: 'Fuel',
      category: 'Transport',
      amount: -80,
      type: 'expense',
      icon: 'transport',
      occurredAt: '2026-04-05T08:30:00.000Z',
    });
    const goal = buildGoalModel({
      id: 'goal_1',
      title: 'Emergency Fund',
      subtitle: 'Peace of mind',
      targetAmount: 12000,
      savedAmount: 8400,
      monthlyTarget: 450,
      deadline: '2026-11-30T12:00:00.000Z',
      status: 'Active',
      icon: 'savings',
    });

    expect(mapBudgetOverviewFromTransactions([salary, groceries, fuel])).toEqual(
      expect.objectContaining({
        totalBalanceLabel: '$3,900.00',
        totalIncomeLabel: '$4,200.00',
        totalExpenseLabel: '-$300.00',
      }),
    );

    expect(
      buildHomeDashboard([salary, groceries, fuel], [goal], 'John Smith'),
    ).toMatchObject({
      primaryGoal: expect.objectContaining({
        title: 'Emergency Fund',
      }),
      recentTransactions: expect.arrayContaining([
        expect.objectContaining({ id: 'txn_fuel' }),
      ]),
    });

    expect(buildInsightsDashboard([salary, groceries, fuel], [goal])).toMatchObject({
      highestSpendingCategory: expect.objectContaining({
        value: 'Groceries',
      }),
      dominantTransactionType: expect.objectContaining({
        value: 'Expense entries',
      }),
      categoryBreakdown: expect.arrayContaining([
        expect.objectContaining({
          category: 'Groceries',
        }),
        expect.objectContaining({
          category: 'Transport',
        }),
      ]),
    });
  });

  it('anchors chart trends to the latest mock transaction instead of today', () => {
    const now = new Date();
    const latestTransactionDate = new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate(),
      12,
      0,
      0,
      0,
    );
    const earlierTransactionDate = new Date(latestTransactionDate);
    earlierTransactionDate.setDate(earlierTransactionDate.getDate() - 2);

    const salary = mapTransactionApiToModel({
      id: 'txn_salary_old',
      title: 'Salary',
      category: 'Salary',
      amount: 4200,
      type: 'income',
      icon: 'salary',
      occurredAt: latestTransactionDate.toISOString(),
    });
    const groceries = mapTransactionApiToModel({
      id: 'txn_groceries_old',
      title: 'Groceries',
      category: 'Groceries',
      amount: -220,
      type: 'expense',
      icon: 'groceries',
      occurredAt: earlierTransactionDate.toISOString(),
    });

    const homeDashboard = buildHomeDashboard([salary, groceries], [], 'John Smith');
    const insightsDashboard = buildInsightsDashboard([salary, groceries], []);

    expect(
      homeDashboard.weeklyTrend.some(
        (point) => point.income > 0 || point.expense > 0,
      ),
    ).toBe(true);
    expect(
      insightsDashboard.monthlyTrend.some(
        (point) => point.income > 0 || point.expense > 0,
      ),
    ).toBe(true);
  });
});
