import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { InsightsStackParamList } from '../../types/navigation';
import { InsightsScreen } from '../../screens/Insights/InsightsScreen';
import { colors } from '../../theme/colors';
import NotificationScreen from '../../screens/Notification/NotificationScreen';

const Stack = createNativeStackNavigator<InsightsStackParamList>();

export function InsightsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Insights" component={InsightsScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
