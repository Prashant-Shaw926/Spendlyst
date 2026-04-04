import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

type SegmentedTabsProps<T extends string> = {
  activeTab: T;
  tabs: readonly T[];
  onChange: (tab: T) => void;
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  activeItemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeLabelStyle?: StyleProp<TextStyle>;
  inactiveLabelStyle?: StyleProp<TextStyle>;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  gap?: number;
  containerPadding?: number;
};

export function SegmentedTabs<T extends string>({
  activeTab,
  tabs,
  onChange,
  containerStyle,
  itemStyle,
  activeItemStyle,
  labelStyle,
  activeLabelStyle,
  inactiveLabelStyle,
  activeBackgroundColor = '#00D09E',
  inactiveBackgroundColor = 'transparent',
  activeTextColor = '#052224',
  inactiveTextColor = '#000000',
  gap = moderateScale(6),
  containerPadding = moderateScale(6),
}: SegmentedTabsProps<T>) {
  return (
    <View
      style={[
        {
          borderRadius: S.radius.lg,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: containerPadding,
          paddingVertical: containerPadding,
          gap,
        },
        containerStyle,
      ]}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;

        return (
          <TouchableOpacity
            key={tab}
            accessibilityRole="button"
            onPress={() => onChange(tab)}
            style={[
              {
                flex: 1,
                borderRadius: S.radius.lg,
                backgroundColor: isActive
                  ? activeBackgroundColor
                  : inactiveBackgroundColor,
                paddingHorizontal: moderateScale(12),
                paddingVertical: moderateScale(12),
                alignItems: 'center',
                justifyContent: 'center',
              },
              itemStyle,
              isActive ? activeItemStyle : null,
            ]}
          >
            <Text
              style={[
                {
                  fontFamily: isActive ? 'Poppins-Medium' : 'Poppins-Regular',
                  fontSize: S.fs.md,
                  color: isActive ? activeTextColor : inactiveTextColor,
                },
                labelStyle,
                isActive ? activeLabelStyle : inactiveLabelStyle,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
