import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import { SettingsScreen } from '../../screens/Settings/SettingsScreen';
import { darkColors, lightColors } from '../../theme/colors';
import type { SettingsStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export function SettingsStack() {
  const isDark = useColorScheme() === 'dark';
  const contentBackgroundColor = isDark
    ? darkColors.background
    : lightColors.background;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: contentBackgroundColor },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen component={SettingsScreen} name="Settings" />
      <Stack.Screen component={NotificationScreen} name="Notification" />
    </Stack.Navigator>
  );
}
