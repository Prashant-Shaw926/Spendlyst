import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BellIcon } from '../shared/FinanceIcons';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

type HeaderProps = {
  iconColor: string;
  subtitle: string;
  title: string;
  onNotificationPress: () => void;
};

export function Header({
  iconColor,
  subtitle,
  title,
  onNotificationPress,
}: HeaderProps) {
  return (
    <View
      className="flex-row items-center justify-between"
      style={{
        paddingHorizontal: moderateScale(36),
        paddingVertical: moderateScale(12),
      }}
    >
      <View style={{ gap: moderateScale(2) }}>
        <Text
          className="text-text font-poppins"
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: moderateScale(24),
            lineHeight: moderateScale(30),
          }}
        >
          {title}
        </Text>

        <Text
          className="text-text font-poppins"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.sm,
            lineHeight: moderateScale(18),
          }}
        >
          {subtitle}
        </Text>
      </View>

      <TouchableOpacity
        accessibilityLabel="Open notifications"
        accessibilityRole="button"
        className="bg-primary-50 rounded-full items-center justify-center"
        onPress={onNotificationPress}
        style={{
          width: moderateScale(42),
          height: moderateScale(42),
        }}
      >
        <BellIcon color={iconColor} size={moderateScale(22)} />
      </TouchableOpacity>
    </View>
  );
}
