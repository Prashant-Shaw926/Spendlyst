import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { S } from '../../theme/scale';

type PillChipProps = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function PillChip({ label, active, onPress }: PillChipProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      className={active ? 'bg-primary-500' : 'bg-secondary-card'}
      onPress={onPress}
      style={{
        borderRadius: S.radius.xxl,
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.md,
      }}
    >
      <Text
        className={active ? 'text-surface-dark' : 'text-text'}
        style={{
          fontFamily: active ? 'Poppins-SemiBold' : 'Poppins-Regular',
          fontSize: S.fs.sm,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
