import React from 'react';
import {
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type IconButtonProps = {
  accessibilityLabel: string;
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
  size?: number;
  borderRadius?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  accessibilityLabel,
  children,
  onPress,
  disabled,
  className,
  size = 40,
  borderRadius = size / 2,
  // backgroundColor = colors.secondaryBackgroundLight,
  borderColor,
  borderWidth = borderColor ? 1 : 0,
  style,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      activeOpacity={0.85}
      className={className ?? 'items-center justify-center'}
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderRadius,
          // backgroundColor,
          borderColor,
          borderWidth,
        },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
}
