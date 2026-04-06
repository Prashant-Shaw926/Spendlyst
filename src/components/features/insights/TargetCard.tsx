import React from 'react';
import { Text, View } from 'react-native';
import type { GoalModel } from '../../../types/models';
import { S } from '../../../theme/scale';
import { ProgressBar } from '../../shared/ProgressBar';

export type TargetCardProps = {
  goal: GoalModel | null;
};

export function TargetCard({ goal }: TargetCardProps) {
  if (!goal) {
    return (
      <View
        className="bg-secondary-card"
        style={{
          borderRadius: S.radius.xxxl,
          gap: S.space.sm,
          paddingHorizontal: S.space.lg,
          paddingVertical: S.space.lg,
        }}
      >
        <Text
          className="text-text"
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: S.fs.md,
          }}
        >
          Goal tracking
        </Text>
        <Text
          className="text-text-muted"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.xs,
          }}
        >
          Add a savings goal to surface milestone progress here.
        </Text>
      </View>
    );
  }

  return (
    <View
      className="bg-secondary-card"
      style={{
        borderRadius: S.radius.xxxl,
        gap: S.space.md,
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.lg,
      }}
    >
      <View style={{ gap: S.space.xs }}>
        <Text
          className="text-text"
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: S.fs.md,
          }}
        >
          {goal.title}
        </Text>
        <Text
          className="text-text-muted"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.xs,
          }}
        >
          {goal.projectedCompletionLabel}
        </Text>
      </View>

      <ProgressBar progressPercent={goal.progress} progressValue={goal.targetAmountLabel} />

      <Text
        className="text-text-muted"
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: S.fs.xs,
        }}
      >
        Saved {goal.savedAmountLabel} of {goal.targetAmountLabel}
      </Text>
    </View>
  );
}
