import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import type { InsightsStackParamList } from '../../types/navigation';
import { InsightsScreen } from '../../screens/Insights/InsightsScreen';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import { darkColors, lightColors } from '../../theme/colors';

const Stack = createNativeStackNavigator<InsightsStackParamList>();

export function InsightsStack() {
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
      }}>
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
