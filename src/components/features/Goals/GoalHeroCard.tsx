import React, { useMemo } from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { PieChart, type pieDataItem } from 'react-native-gifted-charts';
import { colors, getSemanticColors } from '../../../theme/colors';
import { S } from '../../../theme/scale';
import { moderateScale, rs } from '../../../utils/responsive';

export type GoalHeroCardProps = {
  progress: number;
  savedAmount: string;
  targetAmount: string;
  activeGoals: number;
  completedGoals: number;
  monthlySaving: string;
};

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <View
      className="flex-1 bg-card"
      style={{
        borderRadius: S.radius.xl,
        paddingHorizontal: S.space.md,
        paddingVertical: S.space.md,
        gap: S.space.xs,
        ...S.shadow.soft,
      }}
    >
      <Text
        className="text-text-muted"
        style={{
          fontSize: S.fs.xs,
          fontFamily: 'Poppins-Regular',
        }}
      >
        {label}
      </Text>

      <Text
        className="text-text"
        style={{
          fontSize: S.fs.md_h,
          fontFamily: 'Poppins-Bold',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function GoalHeroCard({
  progress,
  savedAmount,
  targetAmount,
  activeGoals,
  completedGoals,
  monthlySaving,
}: GoalHeroCardProps) {
  const isDark = useColorScheme() === 'dark';
  const semanticColors = getSemanticColors(isDark);
  const donutData: pieDataItem[] = useMemo(() => {
    const safeProgress = Math.max(0, Math.min(100, progress));

    return [
      { value: safeProgress, color: colors.primary500 },
      {
        value: 100 - safeProgress,
        color: semanticColors.progress,
      },
    ];
  }, [progress, semanticColors.progress]);

  return (
    <View
      className="bg-secondary-bg dark:bg-secondary-card"
      style={{
        borderRadius: S.radius.xxxl,
        paddingHorizontal: S.space.xl,
        paddingVertical: S.space.xl,
        gap: S.space.lg,
        ...S.shadow.md,
      }}
    >
      <View className="flex-row items-center" style={{ gap: S.space['4xl'] }}>
        <View
          className="items-center"
          style={{ width: moderateScale(104), gap: S.space.sm }}
        >
          <PieChart
            donut
            data={donutData}
            radius={moderateScale(44)}
            innerRadius={moderateScale(34)}
            innerCircleColor="transparent"
            strokeWidth={0}
            centerLabelComponent={() => (
              <Text
                className="text-text"
                style={{
                  fontSize: S.fs.md_h,
                  fontFamily: 'Poppins-Bold',
                }}
              >
                {Math.round(progress)}%
              </Text>
            )}
          />

          <Text
            className="text-center text-text-muted"
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Medium',
            }}
          >
            Overall Progress
          </Text>
        </View>

        <View className="flex-1" style={{ gap: S.space.xs }}>
          <Text
            className="text-text-muted"
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Medium',
            }}
          >
            Saved across all goals
          </Text>

          <Text
            className="text-text"
            style={{
              fontSize: S.fs.xl,
              fontFamily: 'Poppins-Bold',
              letterSpacing: -0.5,
            }}
          >
            {savedAmount}
          </Text>

          <Text
            className="text-text-muted"
            style={{
              fontSize: S.fs.sm,
              fontFamily: 'Poppins-Regular',
            }}
          >
            Target {targetAmount}
          </Text>
        </View>
      </View>

      <View className="flex-row" style={{ gap: S.space.sm }}>
        <StatPill label="Active goals" value={`${activeGoals}`} />
        <StatPill label="Completed" value={`${completedGoals}`} />
      </View>

      <View
        className="flex-row items-center justify-between bg-primary-500"
        style={{
          borderRadius: S.radius.xxl,
          paddingHorizontal: S.space.lg,
          paddingVertical: moderateScale(14),
          marginTop: S.space.xs,
        }}
      >
        <View style={{ gap: moderateScale(2) }}>
          <Text
            className="text-surface-dark"
            style={{
              fontSize: rs(13),
              fontFamily: 'Poppins-Medium',
              opacity: 0.8,
            }}
          >
            Monthly rhythm
          </Text>
          <Text
            className="text-surface-dark"
            style={{
              fontSize: S.fs.md_h,
              fontFamily: 'Poppins-Bold',
            }}
          >
            {monthlySaving}
          </Text>
        </View>

        <View
          className="bg-surface-dark/10"
          style={{
            borderRadius: moderateScale(12),
            paddingHorizontal: S.space.sm,
            paddingVertical: rs(6),
          }}
        >
          <Text
            className="text-surface-dark"
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-SemiBold',
            }}
          >
            Keep it up!
          </Text>
        </View>
      </View>

    </View>
  );
}
