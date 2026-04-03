import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { GoalsStackParamList } from '../../types/navigation';
import { GoalsScreen } from '../../screens/Goals/GoalsScreen';
import { GoalDetailScreen } from '../../screens/Goals/GoalDetailScreen';
import { colors } from '../../theme/colors';
import NotificationScreen from '../../screens/Notification/NotificationScreen';

const Stack = createNativeStackNavigator<GoalsStackParamList>();

export function GoalsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="GoalDetail" component={GoalDetailScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
