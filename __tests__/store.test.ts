import { selectHomePreviewTransactions } from '../src/store/selectors/home.selectors';
import { selectTransactionsByMonth } from '../src/store/selectors/transactions.selectors';
import { migratePersistedTransactionsState } from '../src/store/storage';
import type { TransactionsData } from '../src/types/api';
import type { AppStore } from '../src/store/types';

function createBaseStore(overrides: Partial<AppStore>): AppStore {
  return {
    hasHydrated: true,
    lastGlobalError: null,
    clearGlobalError: jest.fn(),
    setHasHydrated: jest.fn(),
    homeData: null,
    homeStatus: 'idle',
    homeError: null,
    homeLastFetchedAt: null,
    fetchHome: jest.fn(),
    resetHomeError: jest.fn(),
    transactionsById: {},
    transactionIds: [],
    transactionIdsByMonth: {},
    transactionMonthIds: [],
    transactionOverview: null,
    transactionsStatus: 'idle',
    transactionsError: null,
    transactionsLastFetchedAt: null,
    fetchTransactions: jest.fn(),
    resetTransactionsError: jest.fn(),
    insightsData: null,
    insightsStatus: 'idle',
    insightsError: null,
    insightsLastFetchedAt: null,
    fetchInsights: jest.fn(),
    resetInsightsError: jest.fn(),
    ...overrides,
  };
}

describe('store persistence and selectors', () => {
  it('migrates legacy transaction persistence into normalized state', () => {
    const legacyData: TransactionsData = {
      totalBalance: 7783,
      totalExpense: 1187.4,
      budget: 20000,
      spentPercent: 30,
      note: '30% Of Your Expenses, Looks Good.',
      months: [
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
      ],
    };

    expect(
      migratePersistedTransactionsState(
        {
          data: legacyData,
        },
        0,
      ),
    ).toEqual(
      expect.objectContaining({
        transactionIds: ['txn_1'],
        transactionMonthIds: ['April'],
        transactionOverview: expect.objectContaining({
          totalBalanceLabel: '$7,783.00',
        }),
      }),
    );
  });

  it('builds stable grouped transaction sections and home previews from normalized state', () => {
    const store = createBaseStore({
      transactionsById: {
        txn_1: {
          id: 'txn_1',
          title: 'Salary',
          timeLabel: '18:27',
          dateLabel: 'April 30',
          metaLabel: '18:27 - April 30',
          category: 'Monthly',
          amount: 4000,
          amountLabel: '$4,000.00',
          type: 'income',
          isExpense: false,
          icon: 'salary',
          iconBackgroundColor: '#6DB6FE',
          monthLabel: 'April',
        },
      },
      transactionIds: ['txn_1'],
      transactionIdsByMonth: {
        April: ['txn_1'],
      },
      transactionMonthIds: ['April'],
      homeData: {
        headerTitle: 'Hi, Welcome Back',
        greeting: 'Good Morning',
        overview: {
          totalBalance: 7783,
          totalExpense: 1187.4,
          budget: 20000,
          spentPercent: 30,
          note: '30% Of Your Expenses, Looks Good.',
          totalBalanceLabel: '$7,783.00',
          totalExpenseLabel: '-$1,187.40',
          budgetLabel: '$20,000.00',
        },
        weekly: {
          revenue: 4000,
          revenueLabel: '$4,000.00',
          food: -100,
          foodLabel: '-$100.00',
        },
        previewTransactionIds: ['txn_1'],
      },
    });

    expect(selectTransactionsByMonth(store)).toEqual([
      {
        title: 'April',
        items: [expect.objectContaining({ id: 'txn_1' })],
      },
    ]);

    expect(selectHomePreviewTransactions(store)).toEqual([
      expect.objectContaining({
        id: 'txn_1',
        amountLabel: '$4,000.00',
      }),
    ]);
  });
});
