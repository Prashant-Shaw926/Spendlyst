import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';

type ScreenStateProps = {
  mode: 'loading' | 'error';
  title: string;
  message: string;
  onRetry?: () => void;
};

export function ScreenState({
  mode,
  title,
  message,
  onRetry,
}: ScreenStateProps) {
  const stackGap =
    mode === 'loading'
      ? S.space.lg
      : mode === 'error' && onRetry
        ? S.space.xl
        : S.space.sm;

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{
        paddingHorizontal: S.space.paddingHorizontal,
      }}
    >
      <View className="items-center" style={{ gap: stackGap }}>
        {mode === 'loading' ? (
          <ActivityIndicator color={colors.primary500} size="large" />
        ) : null}

        <View className="items-center" style={{ gap: S.space.sm }}>
          <Text
            className="text-text text-center"
            style={{
              fontSize: S.fs.xl,
              fontFamily: 'Poppins-Bold',
            }}
          >
            {title}
          </Text>

          <Text
            className="text-text-muted text-center"
            style={{
              fontSize: S.fs.md,
              fontFamily: 'Poppins-Regular',
              lineHeight: S.fs.md * 1.5,
            }}
          >
            {message}
          </Text>
        </View>

        {mode === 'error' && onRetry ? (
          <TouchableOpacity
            accessibilityRole="button"
            className="rounded-full bg-primary-500"
            onPress={onRetry}
            style={{
              paddingHorizontal: S.space.xl,
              paddingVertical: S.space.md,
            }}
          >
            <Text
              className="text-surface-dark"
              style={{
                fontSize: S.fs.md,
                fontFamily: 'Poppins-SemiBold',
              }}
            >
              Try Again
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
