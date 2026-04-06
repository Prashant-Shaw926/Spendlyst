import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import { darkColors, lightColors } from '../../theme/colors';
import type { ProfileStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
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
      <Stack.Screen component={ProfileScreen} name="Profile" />
      <Stack.Screen component={NotificationScreen} name="Notification" />
    </Stack.Navigator>
  );
}
