import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import type { HomeStackParamList } from '../../types/navigation';
import { HomeScreen } from '../../screens/Home/HomeScreen';
import NotificationScreen from '../../screens/Notification/NotificationScreen';
import { darkColors, lightColors } from '../../theme/colors';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
