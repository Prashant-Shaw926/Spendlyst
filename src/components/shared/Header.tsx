import React from 'react';
import {
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export type HeaderVariant = 'home' | 'centerTitle';

export type HeaderProps = {
  variant: HeaderVariant;
  title: string;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  titleColor?: string;
  subtitleColor?: string;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  leftSlotWidth?: number;
  rightSlotWidth?: number;
};

export function Header({
  variant,
  title,
  subtitle,
  leftAction,
  rightAction,
  containerClassName,
  titleClassName,
  subtitleClassName,
  titleColor,
  subtitleColor,
  contentStyle,
  titleStyle,
  subtitleStyle,
  leftSlotWidth = moderateScale(40),
  rightSlotWidth = moderateScale(40),
}: HeaderProps) {
  return (
    <View
      className={`${containerClassName ?? ''} flex-row items-center ${
        variant === 'home' ? 'justify-between' : 'justify-center'
      }`}
      style={[
        {
          paddingHorizontal: S.space.xl,
          paddingVertical: S.space.md,
        },
        contentStyle,
      ]}
    >
      {variant === 'home' ? (
        <>
          <View className="flex-1" style={{ gap: S.space.xs }}>
            <Text
              className={titleClassName ?? 'text-text'}
              style={[
                {
                  fontSize: moderateScale(24),

                  lineHeight: moderateScale(30),
                },
                titleColor ? { color: titleColor } : null,
                titleStyle,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>

            {subtitle ? (
              <Text
                className={subtitleClassName ?? titleClassName ?? 'text-text'}
                style={[
                  {
                    fontSize: S.fs.sm,
                  },
                  subtitleColor || titleColor
                    ? { color: subtitleColor ?? titleColor }
                    : null,
                  subtitleStyle,
                ]}
                numberOfLines={1}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>

          {rightAction}
        </>
      ) : (
        <>
          <View
            className="flex-row items-center"
            style={{
              paddingHorizontal: S.space.xl,
              paddingVertical: S.space.md,
            }}
          >
            <View style={{ width: leftSlotWidth }}>{leftAction}</View>

            <View className="flex-1 items-center">
              <Text
                className={titleClassName ?? 'text-text'}
                style={[
                  {
                    fontSize: S.fs.lg,
                  },
                  titleColor ? { color: titleColor } : null,
                  titleStyle,
                ]}
                numberOfLines={1}
              >
                {title}
              </Text>
            </View>

            <View className="items-end" style={{ width: rightSlotWidth }}>
              {rightAction}
            </View>
          </View>
        </>
      )}
    </View>
  );
}
