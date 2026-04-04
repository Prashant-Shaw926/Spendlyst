import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export type HeaderVariant = 'home' | 'centerTitle';

export type HeaderProps = {
  variant: HeaderVariant;
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
};

export function Header({
  variant,
  title,
  subtitle,
  onBackPress,
  rightAction,
}: HeaderProps) {
  const showBack = variant === 'centerTitle' && !!onBackPress;

  return (
    <SafeAreaView edges={['top']}>
      <View
        style={{
          paddingHorizontal: S.space.paddingHorizontal,
          paddingVertical: S.space.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: variant === 'home' ? 'space-between' : 'center',
        }}
      >
        {variant === 'home' ? (
          <View style={{ flex: 1 }}>
            <Text
              className="text-text"
              style={{
                fontSize: S.fs.lg,
                fontFamily: 'Poppins-SemiBold',
                lineHeight: S.fs.lg * 1.2,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text
                className="text-text-muted"
                style={{
                  fontSize: S.fs.xs,
                  fontFamily: 'Poppins-Regular',
                  marginTop: 2,
                }}
                numberOfLines={1}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>
        ) : (
          <>
            <View style={{ width: moderateScale(36), alignItems: 'flex-start' }}>
              {showBack ? (
                <TouchableOpacity
                  onPress={onBackPress}
                  style={{
                    width: moderateScale(36),
                    height: moderateScale(36),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Back"
                >
                  <Text className="text-text" style={{ fontSize: S.fs.lg }}>
                    ←
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                className="text-text"
                style={{
                  fontSize: S.fs.md_h,
                  fontFamily: 'Poppins-SemiBold',
                }}
                numberOfLines={1}
              >
                {title}
              </Text>
            </View>

            <View style={{ width: moderateScale(36), alignItems: 'flex-end' }}>
              {rightAction}
            </View>
          </>
        )}

        {variant === 'home' ? rightAction : null}
      </View>
    </SafeAreaView>
  );
}


