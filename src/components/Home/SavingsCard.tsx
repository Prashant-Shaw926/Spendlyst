import React from 'react';
import { Text, View } from 'react-native';
import {
  CarIcon,
  ForkKnifeIcon,
  StackCashIcon,
} from '../shared/FinanceIcons';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

type FinanceIconComponent = React.ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

type SavingsCardProps = {
  revenueValue: string;
  foodValue: string;
};

function SavingsStat({
  Icon,
  label,
  value,
  valueClassName,
}: {
  Icon: FinanceIconComponent;
  label: string;
  value: string;
  valueClassName: string;
}) {
  return (
    <View className="flex-row items-center" style={{ gap: moderateScale(12) }}>
      <Icon color={colors.surfaceDark} size={moderateScale(28)} />

      <View style={{ gap: moderateScale(2) }}>
        <Text
          className="text-surface-dark font-poppins"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.sm,
          }}
        >
          {label}
        </Text>

        <Text
          className={`${valueClassName} font-poppins`}
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: moderateScale(16),
            lineHeight: moderateScale(22),
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

export function SavingsCard({
  revenueValue,
  foodValue,
}: SavingsCardProps) {
  return (
    <View
      className="bg-primary-500 rounded-[32px] flex-row items-center"
      style={{
        paddingHorizontal: moderateScale(22),
        paddingVertical: moderateScale(20),
        gap: moderateScale(18),
      }}
    >
      <View
        className="items-center justify-center"
        style={{
          width: moderateScale(118),
          gap: moderateScale(10),
        }}
      >
        <View
          className="rounded-full border-blue-700 items-center justify-center"
          style={{
            width: moderateScale(70),
            height: moderateScale(70),
            borderWidth: moderateScale(3),
          }}
        >
          <CarIcon color={colors.surfaceDark} size={moderateScale(30)} />
        </View>

        <Text
          className="text-surface-dark font-poppins text-center"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.md,
            lineHeight: moderateScale(24),
          }}
        >
          Savings{'\n'}On Goals
        </Text>
      </View>

      <View
        className="bg-white"
        style={{
          width: 1,
          alignSelf: 'stretch',
        }}
      />

      <View style={{ flex: 1, gap: moderateScale(14) }}>
        <SavingsStat
          Icon={StackCashIcon}
          label="Revenue Last Week"
          value={revenueValue}
          valueClassName="text-surface-dark"
        />

        <View
          className="bg-white"
          style={{
            height: 1,
          }}
        />

        <SavingsStat
          Icon={ForkKnifeIcon}
          label="Food Last Week"
          value={foodValue}
          valueClassName="text-finance-expense"
        />
      </View>
    </View>
  );
}
