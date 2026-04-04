import React from 'react';
import { View } from 'react-native';
import { ExpenseIcon, IncomeIcon } from '../../../assets/icons';
import type { BudgetOverviewModel } from '../../../types/models';
import { colors } from '../../../theme/colors';
import { moderateScale } from '../../../utils/responsive';
import { BudgetOverview } from '../../shared/BudgetOverview';

type HomeBalanceSectionProps = {
  isDark: boolean;
  overview: BudgetOverviewModel;
};

export function HomeBalanceSection({
  isDark,
  overview,
}: HomeBalanceSectionProps) {
  const textColor = isDark ? colors.card : colors.surfaceDark;
  const expenseColor = isDark ? colors.blue400 : colors.blue700;

  return (
    <View
      style={{
        paddingHorizontal: moderateScale(36),
        paddingVertical: moderateScale(8),
      }}
    >
      <BudgetOverview
        leftMetric={{
          label: 'Total Balance',
          value: overview.totalBalanceLabel,
          labelColor: textColor,
          valueColor: textColor,
          icon: (
            <IncomeIcon
              color={textColor}
              height={moderateScale(14)}
              width={moderateScale(14)}
            />
          ),
        }}
        rightMetric={{
          label: 'Total Expense',
          value: overview.totalExpenseLabel,
          labelColor: textColor,
          valueColor: expenseColor,
          icon: (
            <ExpenseIcon
              color={textColor}
              height={moderateScale(14)}
              width={moderateScale(14)}
            />
          ),
        }}
        progressPercent={overview.spentPercent}
        progressValue={overview.budgetLabel}
        note={overview.note}
        noteColor={textColor}
        noteIconColor={textColor}
        metricsContainerStyle={{
          gap: moderateScale(18),
        }}
        dividerStyle={{
          height: moderateScale(44),
          backgroundColor: colors.primary50,
        }}
      />
    </View>
  );
}
