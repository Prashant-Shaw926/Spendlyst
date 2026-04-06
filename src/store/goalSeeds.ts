import type { GoalUpsertPayload } from './types';

export const goalSeedData: GoalUpsertPayload[] = [
  {
    title: 'Emergency Fund',
    subtitle: 'Keep three months of breathing room',
    targetAmount: 12000,
    savedAmount: 8400,
    monthlyTarget: 450,
    deadline: '2026-11-30T12:00:00.000Z',
    status: 'Active',
    icon: 'savings',
  },
  {
    title: 'Dream Car',
    subtitle: 'Upgrade your ride without stress',
    targetAmount: 10000,
    savedAmount: 5600,
    monthlyTarget: 600,
    deadline: '2027-06-30T12:00:00.000Z',
    status: 'Active',
    icon: 'car',
  },
  {
    title: 'Home Deposit',
    subtitle: 'Down payment runway',
    targetAmount: 40000,
    savedAmount: 18500,
    monthlyTarget: 1200,
    deadline: '2027-12-31T12:00:00.000Z',
    status: 'Planned',
    icon: 'home',
  },
  {
    title: 'Summer Trip',
    subtitle: 'Portugal getaway',
    targetAmount: 2400,
    savedAmount: 2400,
    monthlyTarget: 300,
    deadline: '2026-04-30T12:00:00.000Z',
    status: 'Completed',
    icon: 'travel',
  },
];
