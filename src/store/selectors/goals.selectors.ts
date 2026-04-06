import { getGoalSummary, getGoalsByStatus } from '../../utils/finance';
import { createCachedSelector } from './helpers';
import type { AppStore } from '../types';
import type { GoalStatus } from '../../types/models';

export const selectAddGoal = (state: AppStore) => state.addGoal;
export const selectDeleteGoal = (state: AppStore) => state.deleteGoal;
export const selectSeedGoalsIfEmpty = (state: AppStore) => state.seedGoalsIfEmpty;
export const selectUpdateGoal = (state: AppStore) => state.updateGoal;

export const selectAllGoals = createCachedSelector(
  (state): [AppStore['goalIds'], AppStore['goalsById']] => [
    state.goalIds,
    state.goalsById,
  ],
  (goalIds, goalsById) => goalIds.map((goalId) => goalsById[goalId]).filter(Boolean),
);

export const selectGoalSummary = createCachedSelector(
  (state): [AppStore['goalIds'], AppStore['goalsById']] => [
    state.goalIds,
    state.goalsById,
  ],
  (goalIds, goalsById) =>
    getGoalSummary(goalIds.map((goalId) => goalsById[goalId]).filter(Boolean)),
);

export const selectGoalsByStatus = (status: GoalStatus) =>
  createCachedSelector(
    (state): [AppStore['goalIds'], AppStore['goalsById']] => [
      state.goalIds,
      state.goalsById,
    ],
    (goalIds, goalsById) =>
      getGoalsByStatus(
        goalIds.map((goalId) => goalsById[goalId]).filter(Boolean),
        status,
      ),
  );

export const selectGoalById = (goalId?: string) => (state: AppStore) =>
  goalId ? state.goalsById[goalId] ?? null : null;
