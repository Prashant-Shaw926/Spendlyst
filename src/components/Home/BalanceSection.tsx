import React from 'react';
import type { SvgProps } from 'react-native-svg';
import { Text, View } from 'react-native';
import { ExpenseIcon, IncomeIcon } from '../../assets/icons';
import { CheckSquareIcon } from '../shared/FinanceIcons';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';
import { ProgressBar } from './ProgressBar';

type MetricProps = {
  Icon: React.ComponentType<SvgProps>;
  iconColor: string;
  label: string;
  value: string;
  valueClassName: string;
};

function Metric({
  Icon,
  iconColor,
  label,
  value,
  valueClassName,
}: MetricProps) {
  return (
    <View style={{ flex: 1, gap: moderateScale(8) }}>
      <View className="flex-row items-center" style={{ gap: moderateScale(6) }}>
        <Icon color={iconColor} height={moderateScale(14)} width={moderateScale(14)} />
        <Text
          className="text-text font-poppins"
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: S.fs.sm,
          }}
        >
          {label}
        </Text>
      </View>

      <Text
        className={`${valueClassName} font-poppins`}
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: moderateScale(22),
          lineHeight: moderateScale(28),
        }}
      >
        {value}
      </Text>
    </View>
  );
}

type BalanceSectionProps = {
  iconColor: string;
  totalBalance: string;
  totalExpense: string;
  progressPercent: number;
  progressValue: string;
  note: string;
};

export function BalanceSection({
  iconColor,
  totalBalance,
  totalExpense,
  progressPercent,
  progressValue,
  note,
}: BalanceSectionProps) {
  return (
    <View
      style={{
        paddingHorizontal: moderateScale(36),
        paddingVertical: moderateScale(8),
        gap: moderateScale(18),
      }}
    >
      <View className="flex-row items-center justify-between" style={{ gap: moderateScale(18) }}>
        <Metric
          Icon={IncomeIcon}
          iconColor={iconColor}
          label="Total Balance"
          value={totalBalance}
          valueClassName="text-white"
        />

        <View
          className="bg-primary-50"
          style={{
            width: 1,
            height: moderateScale(44),
          }}
        />

        <Metric
          Icon={ExpenseIcon}
          iconColor={iconColor}
          label="Total Expense"
          value={totalExpense}
          valueClassName="text-finance-expense"
        />
      </View>

      <View style={{ gap: moderateScale(14) }}>
        <ProgressBar
          progressPercent={progressPercent}
          progressValue={progressValue}
        />

        <View className="flex-row items-center" style={{ gap: moderateScale(8) }}>
          <CheckSquareIcon color={iconColor} size={moderateScale(15)} />
          <Text
            className="text-text font-poppins"
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: S.fs.md,
            }}
          >
            {note}
          </Text>
        </View>
      </View>
    </View>
  );
}
