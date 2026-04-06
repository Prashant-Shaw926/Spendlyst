import {
  EMPTY_PERSISTED_APP_STATE,
  migratePersistedAppState,
  storage,
} from '../src/storage/mmkv';
import {
  selectGoalSummary,
  selectHomeDashboard,
  selectInsightsDashboard,
  useAppStore,
} from '../src/store';
import type { TransactionsData } from '../src/types/api';

function resetStore() {
  storage.clearAll();
  useAppStore.setState({
    ...EMPTY_PERSISTED_APP_STATE,
    hasHydrated: true,
    hasInitializedData: false,
    isInitializingApp: false,
    lastGlobalError: null,
    transactionsStatus: 'idle',
    userName: 'John Smith',
  });
}

describe('app store persistence, seeding, and CRUD', () => {
  beforeEach(() => {
    resetStore();
  });

  it('migrates legacy transaction persistence into the new persisted app shape', () => {
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
      migratePersistedAppState(
        {
          data: legacyData,
        },
        0,
      ),
    ).toEqual(
      expect.objectContaining({
        transactionIds: ['txn_1'],
        transactionMonthIds: [expect.stringContaining('April')],
        goalsById: {},
        goalIds: [],
      }),
    );
  });

  it('seeds demo data only once and marks the app as initialized', async () => {
    const state = useAppStore.getState();

    expect(state.transactionIds).toHaveLength(0);
    expect(state.goalIds).toHaveLength(0);

    await state.initializeAppData();
    const initializedState = useAppStore.getState();

    expect(initializedState.hasInitializedData).toBe(true);
    expect(initializedState.transactionIds.length).toBeGreaterThan(0);
    expect(initializedState.goalIds.length).toBeGreaterThan(0);
  });

  it('supports transaction and goal CRUD while keeping derived dashboards in sync', () => {
    const state = useAppStore.getState();

    const goalId = state.addGoal({
      title: 'Rainy Day Fund',
      subtitle: 'Small buffer for surprises',
      targetAmount: 3000,
      savedAmount: 600,
      monthlyTarget: 200,
      deadline: '2026-12-31T12:00:00.000Z',
      status: 'Active',
      icon: 'savings',
    });

    const incomeId = state.addTransaction({
      title: 'Salary',
      notes: 'Monthly paycheck',
      category: 'Salary',
      amount: 5000,
      type: 'income',
      occurredAt: '2026-04-01T09:00:00.000Z',
    });

    const expenseId = state.addTransaction({
      title: 'Groceries',
      notes: 'Weekly haul',
      category: 'Groceries',
      amount: 250,
      type: 'expense',
      occurredAt: '2026-04-03T18:00:00.000Z',
    });

    let nextState = useAppStore.getState();

    expect(nextState.transactionOverview).toEqual(
      expect.objectContaining({
        totalBalanceLabel: '$4,750.00',
      }),
    );
    expect(nextState.transactionsById[incomeId]).toEqual(
      expect.objectContaining({
        title: 'Salary',
      }),
    );

    nextState.updateTransaction(expenseId, {
      title: 'Weekend Trip',
      notes: 'Train and hotel',
      category: 'Travel',
      amount: 600,
      type: 'expense',
      occurredAt: '2026-05-05T09:00:00.000Z',
    });

    const coffeeId = nextState.addTransaction({
      title: 'Coffee',
      notes: 'Team catch-up',
      category: 'Food',
      amount: 20,
      type: 'expense',
      occurredAt: '2026-05-06T10:00:00.000Z',
    });

    nextState.updateGoal(goalId, {
      title: 'Rainy Day Fund',
      subtitle: 'Small buffer for surprises',
      targetAmount: 3000,
      savedAmount: 1000,
      monthlyTarget: 250,
      deadline: '2026-12-31T12:00:00.000Z',
      status: 'Active',
      icon: 'savings',
    });

    nextState = useAppStore.getState();

    expect(nextState.transactionsById[expenseId]).toEqual(
      expect.objectContaining({
        category: 'Travel',
        monthLabel: 'May 2026',
        notes: 'Train and hotel',
      }),
    );

    expect(selectHomeDashboard(nextState)).toMatchObject({
      recentTransactions: expect.arrayContaining([
        expect.objectContaining({
          id: coffeeId,
        }),
        expect.objectContaining({
          id: expenseId,
        }),
      ]),
      overview: expect.objectContaining({
        totalExpenseLabel: '-$620.00',
      }),
    });

    expect(selectInsightsDashboard(nextState)).toMatchObject({
      highestSpendingCategory: expect.objectContaining({
        value: 'Travel',
      }),
      dominantTransactionType: expect.objectContaining({
        value: 'Expense entries',
      }),
    });

    expect(selectGoalSummary(nextState)).toMatchObject({
      activeCount: 1,
      totalSavedLabel: '$1,000.00',
    });

    nextState.deleteTransaction(coffeeId);
    nextState = useAppStore.getState();

    expect(nextState.transactionsById[coffeeId]).toBeUndefined();
    expect(nextState.transactionOverview).toEqual(
      expect.objectContaining({
        totalBalanceLabel: '$4,400.00',
      }),
    );
  });

  it('returns an empty persisted shape when migration receives invalid input', () => {
    expect(migratePersistedAppState(null, 2)).toEqual(EMPTY_PERSISTED_APP_STATE);
  });
});
