import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { PieChart, type pieDataItem } from 'react-native-gifted-charts';
import type { InsightTargetModel } from '../../../types/models';
import { colors } from '../../../theme/colors';
import { S } from '../../../theme/scale';
import { moderateScale } from '../../../utils/responsive';

export type TargetCardProps = {
  isDark: boolean;
  target: InsightTargetModel;
};

export function TargetCard({
  isDark,
  target,
}: TargetCardProps) {
  const donutData: pieDataItem[] = useMemo(() => {
    const progress = Math.max(0, Math.min(100, target.percent));

    return [
      { value: progress, color: colors.primary500 },
      {
        value: 100 - progress,
        color: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(5,34,36,0.12)',
      },
    ];
  }, [isDark, target.percent]);

  return (
    <View
      style={{
        flex: 1,
        borderRadius: moderateScale(24),
        backgroundColor: isDark ? colors.surfaceMedium : colors.primary100,
        padding: moderateScale(18),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flex: 1, paddingRight: S.space.md }}>
          <Text
            style={{
              fontSize: S.fs.md,
              fontFamily: 'Poppins-SemiBold',
              color: isDark ? colors.card : colors.surfaceDark,
            }}
          >
            {target.label}
          </Text>
          <Text
            style={{
              marginTop: 6,
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Regular',
              color: isDark ? 'rgba(255,255,255,0.7)' : colors.textMuted,
            }}
          >
            Saved {target.savedAmountLabel}
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Regular',
              color: isDark ? 'rgba(255,255,255,0.7)' : colors.textMuted,
            }}
          >
            Goal {target.goalAmountLabel}
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
              {Math.round(target.percent)}%
            </Text>
          )}
        />
      </View>
    </View>
  );
}
