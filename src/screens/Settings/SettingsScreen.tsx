import React from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';

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
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: S.space.gutter,
        }}
      >
        <Text
          style={{
            fontSize: S.fs.xl,
            fontFamily: 'Poppins-Bold',
            color: isDark ? colors.card : colors.surfaceDark,
          }}
        >
          Settings
        </Text>
      </View>
    </SafeAreaView>
  );
}
