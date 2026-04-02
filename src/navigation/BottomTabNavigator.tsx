import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from '../types/navigation';
import { HomeStack } from './stacks/HomeStack';
import { TransactionsStack } from './stacks/TransactionsStack';
import { GoalsStack } from './stacks/GoalsStack';
import { InsightsStack } from './stacks/InsightsStack';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator<BottomTabParamList>();

type TabIconProps = {
  focused: boolean;
  icon: string;
  label: string;
};

function TabIcon({ focused, icon, label }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.tabEmoji, { opacity: focused ? 1 : 0.5 }]}>
        {icon}
      </Text>
      <Text
        style={[
          styles.tabLabel,
          { color: focused ? colors.tabActive : colors.tabInactive },
        ]}>
        {label}
      </Text>
    </View>
  );
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="🏠" label="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="TransactionsTab"
        component={TransactionsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="💳" label="Transactions" />
          ),
        }}
      />
      <Tab.Screen
        name="GoalsTab"
        component={GoalsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="🎯" label="Goals" />
          ),
        }}
      />
      <Tab.Screen
        name="InsightsTab"
        component={InsightsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="📊" label="Insights" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: Platform.OS === 'ios' ? 84 : 64,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 8,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabEmoji: {
    fontSize: 22,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});