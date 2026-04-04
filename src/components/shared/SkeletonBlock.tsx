import React from 'react';
import { View } from 'react-native';
import { colors } from '../../theme/colors';
import { moderateScale } from '../../utils/responsive';

type SkeletonBlockProps = {
  width?: number | string;
  height: number;
  radius?: number;
  isDark: boolean;
};

export function SkeletonBlock({
  width = '100%',
  height,
  radius = 16,
  isDark,
}: SkeletonBlockProps) {
  return (
    <View
      style={{
        width,
        height,
        borderRadius: moderateScale(radius),
        backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : colors.primary100,
      }}
    />
  );
}
