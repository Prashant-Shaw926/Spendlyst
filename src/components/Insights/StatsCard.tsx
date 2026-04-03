import React from 'react';
import { Text, View } from 'react-native';
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from '../shared/FinanceIcons';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export type InsightsStatsCardProps = {
  isDark: boolean;
  incomeValue: string;
  expenseValue: string;
};

function StatItem({
  label,
  value,
  isDark,
  isExpense,
}: {
  label: string;
  value: string;
  isDark: boolean;
  isExpense?: boolean;
}) {
  const accent = isExpense ? colors.blue700 : colors.primary500;
  const Icon = isExpense ? ArrowDownRightIcon : ArrowUpRightIcon;

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Icon color={isDark ? colors.primary50 : accent} size={26} />
      <Text
        style={{
          marginTop: S.space.sm,
          fontSize: S.fs.lg,
          fontFamily: 'Poppins-Medium',
          color: isDark ? colors.card : colors.surfaceDark,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          marginTop: 2,
          fontSize: moderateScale(18),
          fontFamily: 'Poppins-Bold',
          color: isExpense ? colors.blue700 : isDark ? colors.primary50 : colors.surfaceDark,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function StatsCard({
  isDark,
  incomeValue,
  expenseValue,
}: InsightsStatsCardProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(28),
        paddingHorizontal: moderateScale(6),
      }}
    >
      <StatItem label="Income" value={incomeValue} isDark={isDark} />
      <StatItem label="Expense" value={expenseValue} isDark={isDark} isExpense />
    </View>
  );
}
