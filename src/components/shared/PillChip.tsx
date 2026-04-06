import React from 'react';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';
import { colors, getSemanticColors } from '../../theme/colors';
import { S } from '../../theme/scale';

type PillChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function PillChip({ label, active, onPress }: PillChipProps) {
  const semanticColors = getSemanticColors(useColorScheme() === 'dark');

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        borderRadius: S.radius.xxl,
        backgroundColor: active ? colors.primary500 : semanticColors.secondaryCard,
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.md,
      }}
    >
      <Text
        style={{
          color: active ? colors.surfaceDark : semanticColors.text,
          fontFamily: active ? 'Poppins-SemiBold' : 'Poppins-Regular',
          fontSize: S.fs.sm,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
