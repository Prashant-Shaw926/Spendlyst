import type { GoalIconKey, GoalStatus } from '../types/models';

export const transactionTypeOptions = ['income', 'expense'] as const;

export const transactionCategorySuggestions = [
  'Salary',
  'Freelance',
  'Rent',
  'Groceries',
  'Food',
  'Transport',
  'Travel',
  'Utilities',
  'Entertainment',
  'Health',
] as const;

export const goalStatusOptions: readonly GoalStatus[] = [
  'Active',
  'Planned',
  'Completed',
] as const;

export const goalIconOptions: readonly {
  key: GoalIconKey;
  label: string;
}[] = [
  { key: 'savings', label: 'Savings' },
  { key: 'car', label: 'Car' },
  { key: 'travel', label: 'Travel' },
  { key: 'home', label: 'Home' },
];
