import React from 'react';
import { View, useColorScheme, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { SvgProps } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  GoalsIcon,
  HomeIcon,
  InsightsIcon,
  TransactionsIcon,
} from '../assets/icons';
import { UserIcon } from '../components/shared/FinanceIcons';
import type { BottomTabParamList } from '../types/navigation';
import { HomeStack } from './stacks/HomeStack';
import { TransactionsStack } from './stacks/TransactionsStack';
import { GoalsStack } from './stacks/GoalsStack';
import { InsightsStack } from './stacks/InsightsStack';
import { ProfileStack } from './stacks/ProfileStack';
import { colors } from '../theme/colors';
import { moderateScale } from '../utils/responsive';

const Tab = createBottomTabNavigator<BottomTabParamList>();
type TabIconComponent = React.ComponentType<SvgProps>;
type FinanceTabIconComponent = React.ComponentType<{
  size?: number;
  color?: string;
}>;

function TabBubble({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      style={{
        width: moderateScale(50),
        height: moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(25),
        backgroundColor: focused
          ? isDark
            ? colors.primary500 + '33'
            : colors.primary500 + '1A'
          : 'transparent',
      }}
    >
      {children}
    </View>
  );
}

function TabBarIcon({
  Icon,
  focused,
  inactiveColor,
}: {
  Icon: TabIconComponent;
  focused: boolean;
  inactiveColor: string;
}) {
  const iconColor = focused ? colors.primary500 : inactiveColor;

  return (
    <TabBubble focused={focused}>
      <Icon width={24} height={24} color={iconColor} />
    </TabBubble>
  );
}

function TabBarFinanceIcon({
  Icon,
  focused,
  inactiveColor,
}: {
  Icon: FinanceTabIconComponent;
  focused: boolean;
  inactiveColor: string;
}) {
  const iconColor = focused ? colors.primary500 : inactiveColor;

  return (
    <TabBubble focused={focused}>
      <Icon size={24} color={iconColor} />
    </TabBubble>
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
          backgroundColor: isDark ? colors.surfaceDark : colors.primary500,
        },
        tabBarStyle: {
          backgroundColor: tabBarBackground,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: moderateScale(88) + Math.max(insets.bottom, moderateScale(10)),
          paddingTop: moderateScale(14),
          paddingBottom: Math.max(insets.bottom, moderateScale(10)),
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarButton: (props) => {
          const { style, ...rest } = props as any;
          return (
            <Pressable
              {...rest}
              android_ripple={null}
              style={style}
            />
          );
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Icon={HomeIcon} focused={focused} inactiveColor={inactiveColor} />
          ),
        }}
      />

      <Tab.Screen
        name="InsightsTab"
        component={InsightsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Icon={InsightsIcon} focused={focused} inactiveColor={inactiveColor} />
          ),
        }}
      />

      <Tab.Screen
        name="TransactionsTab"
        component={TransactionsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              Icon={TransactionsIcon}
              focused={focused}
              inactiveColor={inactiveColor}
            />
          ),
        }}
      />

      <Tab.Screen
        name="GoalsTab"
        component={GoalsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon Icon={GoalsIcon} focused={focused} inactiveColor={inactiveColor} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarFinanceIcon
              Icon={UserIcon}
              focused={focused}
              inactiveColor={inactiveColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}