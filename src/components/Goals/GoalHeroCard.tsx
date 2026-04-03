import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { PieChart, type pieDataItem } from 'react-native-gifted-charts';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export type GoalHeroCardProps = {
  isDark: boolean;
  progress: number;
  savedAmount: string;
  targetAmount: string;
  activeGoals: number;
  completedGoals: number;
  monthlySaving: string;
};

function StatPill({
  label,
  value,
  isDark,
}: {
  label: string;
  value: string;
  isDark: boolean;
}) {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: moderateScale(16),
        backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : colors.card,
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(14),
      }}
    >
      <Text
        style={{
          fontSize: S.fs.xs,
          fontFamily: 'Poppins-Regular',
          color: isDark ? 'rgba(255,255,255,0.68)' : colors.textMuted,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontSize: S.fs.md_h,
          fontFamily: 'Poppins-Bold',
          color: isDark ? colors.card : colors.surfaceDark,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function GoalHeroCard({
  isDark,
  progress,
  savedAmount,
  targetAmount,
  activeGoals,
  completedGoals,
  monthlySaving,
}: GoalHeroCardProps) {
  const donutData: pieDataItem[] = useMemo(() => {
    const safeProgress = Math.max(0, Math.min(100, progress));

    return [
      { value: safeProgress, color: colors.primary500 },
      {
        value: 100 - safeProgress,
        color: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(5,34,36,0.1)',
      },
    ];
  }, [isDark, progress]);

  return (
    <View
      style={{
        borderRadius: moderateScale(32),
        backgroundColor: isDark ? colors.surfaceMedium : colors.primary50,
        padding: moderateScale(20),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: moderateScale(104), alignItems: 'center' }}>
          <PieChart
            donut
            data={donutData}
            radius={moderateScale(44)}
            innerRadius={moderateScale(34)}
            innerCircleColor="transparent"
            strokeWidth={0}
            centerLabelComponent={() => (
              <Text
                style={{
                  fontSize: S.fs.md_h,
                  fontFamily: 'Poppins-Bold',
                  color: isDark ? colors.card : colors.surfaceDark,
                }}
              >
                {Math.round(progress)}%
              </Text>
            )}
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Medium',
              color: isDark ? 'rgba(255,255,255,0.75)' : colors.textMuted,
              textAlign: 'center',
            }}
          >
            Overall Progress
          </Text>
        </View>

        <View style={{ flex: 1, marginLeft: moderateScale(18) }}>
          <Text
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Medium',
              color: isDark ? 'rgba(255,255,255,0.7)' : colors.textMuted,
            }}
          >
            Saved across all goals
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: moderateScale(24),
              fontFamily: 'Poppins-Bold',
              color: isDark ? colors.card : colors.surfaceDark,
              letterSpacing: -0.5,
            }}
          >
            {savedAmount}
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: S.fs.sm,
              fontFamily: 'Poppins-Regular',
              color: isDark ? 'rgba(255,255,255,0.7)' : colors.textMuted,
            }}
          >
            Target {targetAmount}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: moderateScale(10), marginTop: moderateScale(18) }}>
        <StatPill label="Active goals" value={`${activeGoals}`} isDark={isDark} />
        <StatPill label="Completed" value={`${completedGoals}`} isDark={isDark} />
      </View>

      <View
        style={{
          marginTop: moderateScale(16),
          borderRadius: moderateScale(18),
          backgroundColor: colors.primary500,
          paddingVertical: moderateScale(14),
          paddingHorizontal: moderateScale(16),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: S.fs.sm,
            fontFamily: 'Poppins-Medium',
            color: colors.surfaceDark,
          }}
        >
          Monthly saving rhythm
        </Text>
        <Text
          style={{
            fontSize: S.fs.md,
            fontFamily: 'Poppins-Bold',
            color: colors.surfaceDark,
          }}
        >
          {monthlySaving}
        </Text>
      </View>
    </View>
  );
}
