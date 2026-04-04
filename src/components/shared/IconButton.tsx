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
  disabled = false,
  size = 40,
  borderRadius = size / 2,
  backgroundColor = 'transparent',
  borderColor,
  borderWidth = borderColor ? 1 : 0,
  style,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor,
          borderColor,
          borderWidth,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
}
