import React from 'react';
import { View, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabParamList } from '../types/navigation';
import { HomeStack } from './stacks/HomeStack';
import { TransactionsStack } from './stacks/TransactionsStack';
import { GoalsStack } from './stacks/GoalsStack';
import { InsightsStack } from './stacks/InsightsStack';
import { colors } from '../theme/colors';
import { moderateScale } from '../utils/responsive';
import {
  AnalyticsIcon,
  HomeIcon,
  LayersIcon,
  TransferIcon,
} from '../components/shared/FinanceIcons';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function TabBubble({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(25),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? colors.primary500 : 'transparent',
      }}
    >
      {children}
    </View>
  );
}

export function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  const inactiveColor = isDark ? colors.primary50 : colors.surfaceDark;
  const tabBarBackground = isDark ? colors.surfaceMedium : colors.primary100;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        sceneStyle: {
          backgroundColor: isDark ? colors.surfaceDeep : colors.primary500,
        },
        tabBarStyle: {
          backgroundColor: tabBarBackground,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: moderateScale(88) + Math.max(insets.bottom, moderateScale(10)),
          paddingTop: moderateScale(14),
          paddingBottom: Math.max(insets.bottom, moderateScale(10)),
          borderTopLeftRadius: moderateScale(40),
          borderTopRightRadius: moderateScale(40),
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBubble focused={focused}>
              <HomeIcon
                color={focused ? colors.surfaceDark : inactiveColor}
                size={24}
              />
            </TabBubble>
          ),
        }}
      />

      <Tab.Screen
        name="InsightsTab"
        component={InsightsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBubble focused={focused}>
              <AnalyticsIcon
                color={focused ? colors.surfaceDark : inactiveColor}
                size={24}
              />
            </TabBubble>
          ),
        }}
      />

      <Tab.Screen
        name="TransactionsTab"
        component={TransactionsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBubble focused={focused}>
              <TransferIcon
                color={focused ? colors.surfaceDark : inactiveColor}
                size={24}
              />
            </TabBubble>
          ),
        }}
      />

      <Tab.Screen
        name="GoalsTab"
        component={GoalsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBubble focused={focused}>
              <LayersIcon
                color={focused ? colors.surfaceDark : inactiveColor}
                size={24}
              />
            </TabBubble>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
