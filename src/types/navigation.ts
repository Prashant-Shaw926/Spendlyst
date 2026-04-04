import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  Home: undefined;
  Settings: undefined;
  Notification: undefined;
};

export type TransactionsStackParamList = {
  Transactions: undefined;
  AddTransaction: { transactionId?: string } | undefined;
  TransactionDetail: { transactionId: string };
  Notification: undefined;
};

export type GoalsStackParamList = {
  Goals: undefined;
  GoalDetail: { goalId: string };
  Notification: undefined;
};

export type InsightsStackParamList = {
  Insights: undefined;
  Notification: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  Notification: undefined;
};

export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  InsightsTab: NavigatorScreenParams<InsightsStackParamList>;
  TransactionsTab: NavigatorScreenParams<TransactionsStackParamList>;
  GoalsTab: NavigatorScreenParams<GoalsStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};

export type RootStackParamList = {
  Splash: undefined;
  Main: NavigatorScreenParams<BottomTabParamList>;
};
