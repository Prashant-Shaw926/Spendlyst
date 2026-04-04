import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

type ScreenStateProps = {
  isDark: boolean;
  mode: 'loading' | 'error';
  title: string;
  message: string;
  onRetry?: () => void;
};

export function ScreenState({
  isDark,
  mode,
  title,
  message,
  onRetry,
}: ScreenStateProps) {
  const primaryText = isDark ? colors.card : colors.surfaceDark;
  const secondaryText = isDark ? 'rgba(255,255,255,0.7)' : colors.textMuted;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(36),
      }}
    >
      {mode === 'loading' ? (
        <ActivityIndicator color={colors.primary500} size="large" />
      ) : null}

      <Text
        style={{
          marginTop: moderateScale(mode === 'loading' ? 18 : 0),
          fontSize: moderateScale(24),
          fontFamily: 'Poppins-Bold',
          color: primaryText,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          marginTop: moderateScale(8),
          fontSize: S.fs.md,
          fontFamily: 'Poppins-Regular',
          color: secondaryText,
          textAlign: 'center',
          lineHeight: moderateScale(24),
        }}
      >
        {message}
      </Text>

      {mode === 'error' && onRetry ? (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={onRetry}
          style={{
            marginTop: moderateScale(20),
            borderRadius: moderateScale(999),
            backgroundColor: colors.primary500,
            paddingHorizontal: moderateScale(20),
            paddingVertical: moderateScale(12),
          }}
        >
          <Text
            style={{
              fontSize: S.fs.md,
              fontFamily: 'Poppins-SemiBold',
              color: colors.surfaceDark,
            }}
          >
            Try Again
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
