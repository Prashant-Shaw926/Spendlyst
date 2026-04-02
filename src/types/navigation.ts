import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  Home: undefined;
  Settings: undefined;
};

export type TransactionsStackParamList = {
  Transactions: undefined;
  AddTransaction: { transactionId?: string } | undefined;
  TransactionDetail: { transactionId: string };
};

export type GoalsStackParamList = {
  Goals: undefined;
  GoalDetail: { goalId: string };
};

export type InsightsStackParamList = {
  Insights: undefined;
};

export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  TransactionsTab: NavigatorScreenParams<TransactionsStackParamList>;
  GoalsTab: NavigatorScreenParams<GoalsStackParamList>;
  InsightsTab: NavigatorScreenParams<InsightsStackParamList>;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>;
  Onboarding: undefined;
};