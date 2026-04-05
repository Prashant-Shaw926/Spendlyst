import React, { memo } from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { colors } from '../../../theme/colors';
import { S } from '../../../theme/scale';
import type { InsightsModel } from '../../../types/models';
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from '../../shared/FinanceIcons';

type InsightsSummaryStatsProps = {
  summary: InsightsModel['summary'];
};

function StatItem({
  label,
  value,
  iconColor,
  isExpense,
}: {
  label: string;
  value: string;
  iconColor: string;
  isExpense?: boolean;
}) {
  const Icon = isExpense ? ArrowDownRightIcon : ArrowUpRightIcon;

  return (
    <View className="flex-1 items-center" style={{ gap: S.space.sm }}>
      <Icon color={iconColor} size={26} />

      <Text
        className="text-text"
        style={{
          fontSize: S.fs.lg,
          fontFamily: 'Poppins-Medium',
        }}
      >
        {label}
      </Text>

      <Text
        className="text-text"
        style={{
          fontSize: S.fs.md_h,
          fontFamily: 'Poppins-SemiBold',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function InsightsSummaryStatsComponent({ summary }: InsightsSummaryStatsProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View
      className="flex-row justify-between"
      style={{
        paddingHorizontal: S.space.sm,
      }}
    >
      <StatItem
        label="Income"
        value={summary.incomeLabel}
        iconColor={isDark ? colors.primary50 : colors.primary500}
      />

      <View
        className="bg-border"
        style={{
          width: 1,
          alignSelf: 'stretch',
        }}
      />

      <StatItem
        label="Expense"
        value={summary.expenseLabel}
        iconColor={isDark ? colors.primary50 : colors.blue700}
        isExpense
      />
    </View>
  );
}

export const InsightsSummaryStats = memo(InsightsSummaryStatsComponent);
