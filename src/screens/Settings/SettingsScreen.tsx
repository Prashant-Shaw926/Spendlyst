import React from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.surfaceDeep : colors.primary50,
      }}
    >
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
