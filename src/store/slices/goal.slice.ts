import { goalSeedData } from '../goalSeeds';
import {
  buildGoalCollections,
  buildGoalModel,
} from '../../utils/finance';
import type { GoalModel } from '../../types/models';
import type { AppStoreSlice, GoalSlice } from '../types';
import { createEntityId } from './helpers';

function selectGoals(state: {
  goalIds: string[];
  goalsById: Record<string, GoalModel>;
}) {
  return state.goalIds.map((goalId) => state.goalsById[goalId]).filter(Boolean);
}

export const createGoalSlice: AppStoreSlice<GoalSlice> = (set, get) => ({
  goalsById: {},
  goalIds: [],
  seedGoalsIfEmpty() {
    if (get().goalIds.length > 0) {
      return;
    }

    const goalCollections = buildGoalCollections(
      goalSeedData.map((goal, index) =>
        buildGoalModel({
          id: `goal_seed_${index + 1}`,
          ...goal,
        }),
      ),
    );

    set({
      ...goalCollections,
    });
  },
  addGoal(payload) {
    const nextGoalId = createEntityId('goal');
    const nextGoals = [
      ...selectGoals(get()),
      buildGoalModel({
        id: nextGoalId,
        ...payload,
      }),
    ];

    set({
      ...buildGoalCollections(nextGoals),
    });

    return nextGoalId;
  },
  updateGoal(goalId, payload) {
    const currentGoal = get().goalsById[goalId];

    if (!currentGoal) {
      return;
    }

    const nextGoals = selectGoals(get()).map((goal) => {
      if (goal.id !== goalId) {
        return goal;
      }

      return buildGoalModel({
        id: goalId,
        ...payload,
        createdAt: currentGoal.createdAt,
        updatedAt: new Date().toISOString(),
      });
    });

    set({
      ...buildGoalCollections(nextGoals),
    });
  },
  deleteGoal(goalId) {
    const nextGoals = selectGoals(get()).filter((goal) => goal.id !== goalId);

    set({
      ...buildGoalCollections(nextGoals),
    });
  },
});
