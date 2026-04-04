import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import { SettingsScreen } from '../../screens/Settings/SettingsScreen';
import { colors } from '../../theme/colors';
import type { SettingsStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen component={SettingsScreen} name="Settings" />
      <Stack.Screen component={NotificationScreen} name="Notification" />
    </Stack.Navigator>
  );
}
