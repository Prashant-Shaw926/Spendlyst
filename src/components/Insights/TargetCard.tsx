import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { PieChart, type pieDataItem } from 'react-native-gifted-charts';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export type TargetCardProps = {
  isDark: boolean;
  label: string;
  savedAmount: string;
  goalAmount: string;
  percent: number;
};

export function TargetCard({
  isDark,
  label,
  savedAmount,
  goalAmount,
  percent,
}: TargetCardProps) {
  const donutData: pieDataItem[] = useMemo(() => {
    const progress = Math.max(0, Math.min(100, percent));

    return [
      { value: progress, color: colors.primary500 },
      {
        value: 100 - progress,
        color: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(5,34,36,0.12)',
      },
    ];
  }, [isDark, percent]);

  return (
    <View
      style={{
        flex: 1,
        borderRadius: moderateScale(24),
        backgroundColor: isDark ? colors.surfaceMedium : colors.primary100,
        padding: moderateScale(18),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, paddingRight: S.space.md }}>
          <Text
            style={{
              fontSize: S.fs.md,
              fontFamily: 'Poppins-SemiBold',
              color: isDark ? colors.card : colors.surfaceDark,
            }}
          >
            {label}
          </Text>
          <Text
            style={{
              marginTop: 6,
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Regular',
              color: isDark ? 'rgba(255,255,255,0.7)' : colors.textMuted,
            }}
          >
            Saved {savedAmount}
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Regular',
              color: isDark ? 'rgba(255,255,255,0.7)' : colors.textMuted,
            }}
          >
            Goal {goalAmount}
          </Text>
        </View>

        <PieChart
          donut
          data={donutData}
          radius={moderateScale(28)}
          innerRadius={moderateScale(22)}
          innerCircleColor="transparent"
          strokeWidth={0}
          centerLabelComponent={() => (
            <Text
              style={{
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-SemiBold',
                color: isDark ? colors.card : colors.surfaceDark,
              }}
            >
              {Math.round(percent)}%
            </Text>
          )}
        />
      </View>
    </View>
  );
}
