import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

type TabsProps<T extends string> = {
  activeTab: T;
  tabs: readonly T[];
  onChange: (tab: T) => void;
};

export function Tabs<T extends string>({
  activeTab,
  tabs,
  onChange,
}: TabsProps<T>) {
  return (
    <View
      className="bg-surface-pill rounded-full flex-row items-center"
      style={{
        paddingHorizontal: moderateScale(6),
        paddingVertical: moderateScale(6),
        gap: moderateScale(6),
      }}
    >
      {tabs.map(tab => {
        const isActive = tab === activeTab;

        return (
          <TouchableOpacity
            key={tab}
            accessibilityRole="button"
            className={`${isActive ? 'bg-primary-500' : 'bg-transparent'} rounded-full flex-1 items-center justify-center`}
            onPress={() => onChange(tab)}
            style={{
              paddingHorizontal: moderateScale(12),
              paddingVertical: moderateScale(12),
            }}
          >
            <Text
              className={`${isActive ? 'text-surface-dark' : 'text-text'} font-poppins`}
              style={{
                fontFamily: isActive ? 'Poppins-Medium' : 'Poppins-Regular',
                fontSize: S.fs.md,
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
