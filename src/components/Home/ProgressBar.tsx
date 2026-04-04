import React from 'react';
import { Text, View } from 'react-native';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

type ProgressBarProps = {
  progressPercent: number;
  progressValue: string;
};

export function ProgressBar({
  progressPercent,
  progressValue,
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progressPercent));

  return (
    <View
      className="bg-primary-50 rounded-full overflow-hidden flex-row items-center"
      style={{
        height: moderateScale(28),
      }}
    >
      <View
        className="bg-surface-dark justify-center"
        style={{
          width: `${clampedProgress}%`,
          height: moderateScale(28),
          paddingHorizontal: moderateScale(20),
        }}
      >
        <Text
          className="text-white font-poppins"
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
          height: moderateScale(28),
          paddingHorizontal: moderateScale(20),
        }}
      >
        <Text
          className="text-surface-dark font-poppins"
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: S.fs.sm,
            fontStyle: 'italic',
          }}
        >
          {progressValue}
        </Text>
      </View>
    </View>
  );
}
