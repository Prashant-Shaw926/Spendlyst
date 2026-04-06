import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-primary-50 dark:bg-surface-deep">
      <View
        className="flex-1 items-center justify-center"
        style={{
          paddingHorizontal: moderateScale(36),
          paddingVertical: moderateScale(24),
          gap: moderateScale(8),
        }}
      >
        <Text
          className="text-text font-poppins"
          style={{
            fontSize: S.fs.lg,
            fontFamily: 'Poppins-Bold',
          }}
        >
          Settings
        </Text>

        <Text
          className="text-text-muted font-poppins text-center"
          style={{
            fontSize: S.fs.sm,
            fontFamily: 'Poppins-Regular',
          }}
        >
          Profile and preferences will live here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
