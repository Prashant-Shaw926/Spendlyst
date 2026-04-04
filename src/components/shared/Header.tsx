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
      style={[
        {
          paddingHorizontal: S.space.paddingHorizontal,
          paddingVertical: S.space.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: variant === 'home' ? 'space-between' : 'center',
        },
        contentStyle,
      ]}
    >
      {variant === 'home' ? (
        <>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                {
                  fontSize: moderateScale(24),
                  fontFamily: 'Poppins-Bold',
                  lineHeight: moderateScale(30),
                  color: titleColor,
                },
                titleStyle,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>

            {subtitle ? (
              <Text
                style={[
                  {
                    fontSize: S.fs.sm,
                    fontFamily: 'Poppins-Regular',
                    marginTop: 2,
                    color: subtitleColor ?? titleColor,
                  },
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
          <View style={{ width: leftSlotWidth, alignItems: 'flex-start' }}>
            {leftAction}
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text
              style={[
                {
                  fontSize: moderateScale(22),
                  fontFamily: 'Poppins-Bold',
                  color: titleColor,
                  letterSpacing: -0.5,
                },
                titleStyle,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>

          <View style={{ width: rightSlotWidth, alignItems: 'flex-end' }}>
            {rightAction}
          </View>
        </>
      )}
    </View>
  );
}
