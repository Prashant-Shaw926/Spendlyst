import React, { useMemo } from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { PieChart, type pieDataItem } from 'react-native-gifted-charts';
import { colors, getSemanticColors } from '../../../theme/colors';
import { S } from '../../../theme/scale';
import type { InsightTargetModel } from '../../../types/models';
import { moderateScale } from '../../../utils/responsive';

export type TargetCardProps = {
  target: InsightTargetModel;
};

export function TargetCard({ target }: TargetCardProps) {
  const isDark = useColorScheme() === 'dark';
  const semanticColors = getSemanticColors(isDark);
  const trackColor = semanticColors.progress;

  const donutData: pieDataItem[] = useMemo(() => {
    const progress = Math.max(0, Math.min(100, target.percent));

    return [
      { value: progress, color: colors.primary500 },
      { value: 100 - progress, color: trackColor },
    ];
  }, [target.percent, trackColor]);

  return (
    <View
      className="flex-1 bg-secondary-card"
      style={{
        borderRadius: S.radius.xxxl,
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.lg,
        gap: S.space.md,
      }}
    >
      <View
        className="flex-row items-center justify-between"
        style={{
          gap: S.space.md,
        }}
      >
        <View className="flex-1" style={{ gap: S.space.xs }}>
          <Text
            className="text-text"
            style={{
              fontSize: S.fs.md,
            }}
          >
            {target.label}
          </Text>

          <Text
            className="text-text-muted"
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Regular',
            }}
          >
            Saved {target.savedAmountLabel}
          </Text>

          <Text
            className="text-text-muted"
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Regular',
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
              className="text-text"
              style={{
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-SemiBold',
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
