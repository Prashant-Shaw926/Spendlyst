import React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

type ProgressBarProps = {
  progressPercent: number;
  progressValue: string;
  style?: StyleProp<ViewStyle>;
};

export function ProgressBar({
  progressPercent,
  progressValue,
  style,
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progressPercent));
  const barHeight = moderateScale(28);
  const barRadius = moderateScale(14);

  return (
    <View
      className="flex-row items-center overflow-hidden rounded-full bg-primary-50"
      style={[{ height: barHeight }, style]}
    >
      <View
        className="bg-progress-bar justify-center"
        style={{
          width: `${clampedProgress}%`,
          height: barHeight,
          borderTopRightRadius: barRadius,
          borderBottomRightRadius: barRadius,
          paddingHorizontal: S.space.md,
        }}
      >
        <Text
          className="text-primary-500"
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: S.fs.xs,
          }}
        >
          {`${clampedProgress}%`}
        </Text>
      </View>

      <View
        className="flex-1 items-end justify-center"
        style={{
          height: barHeight,
          paddingHorizontal: S.space.md,
        }}
      >
        <Text
          className="text-surface-dark"
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: S.fs.xs,
          }}
        >
          {progressValue}
        </Text>
      </View>
    </View>
  );
}
