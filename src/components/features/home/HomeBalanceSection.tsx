import React from 'react';
import { View, useColorScheme } from 'react-native';
import { ExpenseIcon, IncomeIcon } from '../../../assets/icons';
import { getSemanticColors } from '../../../theme/colors';
import { S } from '../../../theme/scale';
import type { BudgetOverviewModel } from '../../../types/models';
import { moderateScale } from '../../../utils/responsive';
import { BudgetOverview } from '../../shared/BudgetOverview';

type HomeBalanceSectionProps = {
  overview: BudgetOverviewModel;
};

export function HomeBalanceSection({ overview }: HomeBalanceSectionProps) {
  const isDark = useColorScheme() === 'dark';
  const semanticColors = getSemanticColors(isDark);

  return (
    <View
      style={{
        paddingHorizontal: S.space.paddingHorizontal,
        paddingVertical: S.space.md,
      }}
    >
      <BudgetOverview
        leftMetric={{
          label: 'Total Balance',
          value: overview.totalBalanceLabel,
          labelClassName: 'text-text',
          valueClassName: 'text-text',
          icon: (
            <IncomeIcon
              color={semanticColors.text}
              height={moderateScale(14)}
              width={moderateScale(14)}
            />
          ),
        }}
        rightMetric={{
          label: 'Total Expense',
          value: overview.totalExpenseLabel,
          labelClassName: 'text-text',
          valueClassName: 'text-finance-expense',
          icon: (
            <ExpenseIcon
              color={semanticColors.text}
              height={moderateScale(14)}
              width={moderateScale(14)}
            />
          ),
        }}
        progressPercent={overview.spentPercent}
        progressValue={overview.budgetLabel}
        note={overview.note}
        noteClassName="text-text"
        noteIconColor={semanticColors.text}
        dividerClassName="bg-primary-50"
        metricsContainerStyle={{ gap: S.space.lg }}
      />
    </View>
  );
}
