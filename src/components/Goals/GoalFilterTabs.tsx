import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { moderateScale } from '../../utils/responsive';

export type GoalFilterTabsProps<T extends string> = {
  tabs: readonly T[];
  activeTab: T;
  isDark: boolean;
  onChange: (tab: T) => void;
};

export function GoalFilterTabs<T extends string>({
  tabs,
  activeTab,
  isDark,
  onChange,
}: GoalFilterTabsProps<T>) {
  return (
    <View
      style={{
        borderRadius: moderateScale(24),
        backgroundColor: isDark ? colors.surfaceMedium : colors.primary100,
        padding: 5,
        flexDirection: 'row',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;

        return (
          <TouchableOpacity
            key={tab}
            accessibilityRole="button"
            onPress={() => onChange(tab)}
            style={{
              flex: 1,
              borderRadius: moderateScale(20),
              backgroundColor: isActive ? colors.primary500 : 'transparent',
              paddingVertical: moderateScale(12),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: isActive ? 'Poppins-Medium' : 'Poppins-Regular',
                color: isActive
                  ? colors.surfaceDark
                  : isDark
                    ? colors.card
                    : colors.surfaceDark,
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
