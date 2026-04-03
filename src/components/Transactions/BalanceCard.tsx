import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export type BalanceCardProps = {
  label: string;
  value: string;
};

export function BalanceCard({ label, value }: BalanceCardProps) {
  return (
    <View
      style={{
        backgroundColor: colors.primary50,
        borderRadius: moderateScale(16),
        paddingVertical: moderateScale(14),
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: S.fs.md,
          fontFamily: 'Poppins-Medium',
          color: colors.surfaceDark,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontSize: moderateScale(22),
          fontFamily: 'Poppins-Bold',
          color: colors.surfaceDark,
          letterSpacing: -0.4,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
