import React from 'react';
import { Text, View } from 'react-native';
import type { GoalModel } from '../../../types/models';
import { colors } from '../../../theme/colors';
import { S } from '../../../theme/scale';
import { ProgressBar } from '../../shared/ProgressBar';

type HomeSavingsCardProps = {
  goal: GoalModel | null;
};

export function HomeSavingsCard({ goal }: HomeSavingsCardProps) {
  if (!goal) {
    return (
      <View
        className="bg-primary-100"
        style={{
          borderRadius: S.radius.xxxl,
          gap: S.space.sm,
          paddingHorizontal: S.space.lg,
          paddingVertical: S.space.lg,
          ...S.shadow.soft,
        }}
      >
        <Text
          className="text-surface-dark"
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: S.fs.md_h,
          }}
        >
          Savings goal
        </Text>
        <Text
          className="text-surface-dark"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.sm,
          }}
        >
          Add your first goal to track progress from the dashboard.
        </Text>
      </View>
    );
  }

  return (
    <View
      className="bg-primary-100"
      style={{
        borderRadius: S.radius.xxxl,
        gap: S.space.md,
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.lg,
        ...S.shadow.soft,
      }}
    >
      <View style={{ gap: S.space.xs }}>
        <Text
          className="text-surface-dark"
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: S.fs.md_h,
          }}
        >
          {goal.title}
        </Text>
        <Text
          className="text-surface-dark"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.sm,
          }}
        >
          {goal.subtitle}
        </Text>
      </View>

      <ProgressBar
        progressPercent={goal.progress}
        progressValue={goal.targetAmountLabel}
        style={{
          backgroundColor: colors.white,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          gap: S.space.md,
        }}
      >
        <View style={{ flex: 1, gap: S.space.xs }}>
          <Text
            className="text-text-muted"
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: S.fs.xs,
            }}
          >
            Saved
          </Text>
          <Text
            className="text-surface-dark"
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: S.fs.md,
            }}
          >
            {goal.savedAmountLabel}
          </Text>
        </View>

        <View style={{ flex: 1, gap: S.space.xs }}>
          <Text
            className="text-text-muted"
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: S.fs.xs,
            }}
          >
            Monthly plan
          </Text>
          <Text
            className="text-surface-dark"
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: S.fs.md,
            }}
          >
            {goal.monthlyTargetLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}
