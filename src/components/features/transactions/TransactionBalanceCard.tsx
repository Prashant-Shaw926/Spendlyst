import React, { memo } from 'react';
import { Text, View } from 'react-native';
import type { BudgetOverviewModel } from '../../../types/models';
import { colors } from '../../../theme/colors';
import { S } from '../../../theme/scale';
import { moderateScale } from '../../../utils/responsive';

type TransactionBalanceCardProps = {
  overview: BudgetOverviewModel;
};

function TransactionBalanceCardComponent({
  overview,
}: TransactionBalanceCardProps) {
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
        Total Balance
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
        {overview.totalBalanceLabel}
      </Text>
    </View>
  );
}

export const TransactionBalanceCard = memo(TransactionBalanceCardComponent);
