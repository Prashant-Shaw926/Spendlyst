import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import type { GoalsStackParamList } from '../../types/navigation';
import { GoalsScreen } from '../../screens/Goals/GoalsScreen';
import { GoalDetailScreen } from '../../screens/Goals/GoalDetailScreen';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import { darkColors, lightColors } from '../../theme/colors';

const Stack = createNativeStackNavigator<GoalsStackParamList>();

export function GoalsStack() {
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
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="GoalDetail" component={GoalDetailScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
