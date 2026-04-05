import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import type { ProfileStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen component={ProfileScreen} name="Profile" />
      <Stack.Screen component={NotificationScreen} name="Notification" />
    </Stack.Navigator>
  );
}
