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
  containerClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  labelClassName?: string;
  activeLabelClassName?: string;
  inactiveLabelClassName?: string;
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
  containerClassName,
  itemClassName,
  activeItemClassName,
  labelClassName,
  activeLabelClassName,
  inactiveLabelClassName,
  containerStyle,
  itemStyle,
  activeItemStyle,
  labelStyle,
  activeLabelStyle,
  inactiveLabelStyle,
  activeBackgroundColor,
  inactiveBackgroundColor,
  activeTextColor,
  inactiveTextColor,
  gap = moderateScale(6),
  containerPadding = moderateScale(6),
}: SegmentedTabsProps<T>) {
  return (
    <View
      className={containerClassName ?? 'flex-row items-center'}
      style={[
        {
          borderRadius: S.radius.lg,
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
            className={`${itemClassName ?? 'flex-1 items-center justify-center'} ${
              isActive ? activeItemClassName ?? '' : ''
            }`}
            onPress={() => onChange(tab)}
            style={[
              {
                borderRadius: S.radius.lg,
                paddingHorizontal: moderateScale(12),
                paddingVertical: moderateScale(12),
              },
              isActive && activeBackgroundColor
                ? { backgroundColor: activeBackgroundColor }
                : null,
              !isActive && inactiveBackgroundColor
                ? { backgroundColor: inactiveBackgroundColor }
                : null,
              itemStyle,
              isActive ? activeItemStyle : null,
            ]}
          >
            <Text
              className={`${labelClassName ?? ''} ${
                isActive
                  ? activeLabelClassName ?? ''
                  : inactiveLabelClassName ?? ''
              }`}
              style={[
                {
                  fontSize: S.fs.md,
                },
                isActive && activeTextColor ? { color: activeTextColor } : null,
                !isActive && inactiveTextColor
                  ? { color: inactiveTextColor }
                  : null,
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
