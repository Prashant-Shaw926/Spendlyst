import {
  mapHomeApiToModel,
  mapInsightsApiToModel,
  mapTransactionApiToModel,
  normalizeTransactionMonths,
} from '../src/utils/finance';
import type { HomeData, InsightsData, TransactionDto, TransactionMonthDto } from '../src/types/api';

describe('finance mappers', () => {
  it('maps transaction DTOs into UI-ready models', () => {
    const apiTransaction: TransactionDto = {
      id: 'txn_demo',
      title: 'Groceries',
      time: '17:00',
      date: 'April 24',
      category: 'Pantry',
      amount: -100,
      type: 'expense',
      icon: 'groceries',
    };

    expect(mapTransactionApiToModel(apiTransaction, 'April')).toEqual(
      expect.objectContaining({
        id: 'txn_demo',
        metaLabel: '17:00 - April 24',
        amountLabel: '-$100.00',
        isExpense: true,
        monthLabel: 'April',
      }),
    );
  });

  it('normalizes monthly transaction groups into ids and entities', () => {
    const months: TransactionMonthDto[] = [
      {
        month: 'April',
        transactions: [
          {
            id: 'txn_1',
            title: 'Salary',
            time: '18:27',
            date: 'April 30',
            category: 'Monthly',
            amount: 4000,
            type: 'income',
            icon: 'salary',
          },
        ],
      },
    ];

    expect(normalizeTransactionMonths(months)).toEqual({
      transactionsById: {
        txn_1: expect.objectContaining({
          id: 'txn_1',
          monthLabel: 'April',
        }),
      },
      transactionIds: ['txn_1'],
      transactionIdsByMonth: {
        April: ['txn_1'],
      },
      transactionMonthIds: ['April'],
    });
  });

  it('maps home and insights payloads into presentation-friendly models', () => {
    const homePayload: HomeData = {
      headerTitle: 'Hi, Welcome Back',
      greeting: 'Good Morning',
      totalBalance: 7783,
      totalExpense: 1187.4,
      budget: 20000,
      spentPercent: 30,
      note: '30% Of Your Expenses, Looks Good.',
      weekly: {
        revenue: 4000,
        food: -100,
      },
      transactionsPreview: [],
    };

    const insightsPayload: InsightsData = {
      totalBalance: 7783,
      totalExpense: 1187.4,
      budget: 20000,
      spentPercent: 30,
      note: '30% Of Your Expenses, Looks Good.',
      tabs: ['Daily', 'Weekly', 'Monthly', 'Year'],
      activeTab: 'Daily',
      chartTitle: 'Income & Expenses',
      charts: [
        {
          key: 'Daily',
          points: [{ label: 'Mon', income: 300, expense: 100 }],
        },
      ],
      summary: {
        income: 4120,
        expense: 1187.4,
      },
      targets: [
        {
          id: 'target_travel',
          label: 'Travel',
          savedAmount: 600,
          goalAmount: 2000,
          percent: 30,
        },
      ],
    };

    expect(mapHomeApiToModel(homePayload)).toEqual(
      expect.objectContaining({
        headerTitle: 'Hi, Welcome Back',
        overview: expect.objectContaining({
          totalBalanceLabel: '$7,783.00',
          totalExpenseLabel: '-$1,187.40',
        }),
      }),
    );

    expect(mapInsightsApiToModel(insightsPayload)).toEqual(
      expect.objectContaining({
        overview: expect.objectContaining({
          budgetLabel: '$20,000.00',
        }),
        summary: expect.objectContaining({
          incomeLabel: '$4,120.00',
        }),
        targets: [
          expect.objectContaining({
            savedAmountLabel: '$600.00',
          }),
        ],
      }),
    );
  });
});
