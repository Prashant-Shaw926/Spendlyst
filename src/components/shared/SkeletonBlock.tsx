import React from 'react';
import { View, type DimensionValue } from 'react-native';
import { moderateScale } from '../../utils/responsive';

type SkeletonBlockProps = {
  width?: DimensionValue;
  height: number;
  radius?: number;
};

export function SkeletonBlock({
  width = '100%',
  height,
  radius = 16,
}: SkeletonBlockProps) {
  return (
    <View
      className="bg-secondary-card"
      style={{
        width,
        height,
        borderRadius: moderateScale(radius),
      }}
    />
  );
}
