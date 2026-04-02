import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { BottomTabNavigator } from './BottomTabNavigator';
import { OnboardingScreen } from '../screens/Onboarding/OnboardingScreen.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  // TODO: Replace with real check from settingsStore (MMKV flag)
  const hasOnboarded = true;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : null}
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}