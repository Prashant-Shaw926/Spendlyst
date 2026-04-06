import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
};

const backgroundByVariant = {
  primary: colors.primary500,
  secondary: colors.primary100,
  danger: colors.error500,
} as const;

const textByVariant = {
  primary: colors.surfaceDark,
  secondary: colors.surfaceDark,
  danger: colors.white,
} as const;

export function PrimaryButton({
  label,
  onPress,
  disabled,
  loading,
  variant = 'primary',
}: PrimaryButtonProps) {
  const backgroundColor = backgroundByVariant[variant];
  const textColor = textByVariant[variant];

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.9}
      disabled={disabled || loading}
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: S.radius.xxl,
        backgroundColor,
        opacity: disabled ? 0.5 : 1,
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.lg,
      }}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          style={{
            color: textColor,

            fontSize: S.fs.md,
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
