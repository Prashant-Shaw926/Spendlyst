import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { S } from '../../../theme/scale';
import type { BudgetOverviewModel } from '../../../types/models';

type TransactionBalanceCardProps = {
  overview: BudgetOverviewModel;
};

function TransactionBalanceCardComponent({
  overview,
}: TransactionBalanceCardProps) {
  return (
    <View
      className="items-center justify-center bg-primary-50"
      style={{
        borderRadius: S.radius.xl,
        paddingVertical: S.space.lg,
        gap: S.space.xs,
        ...S.shadow.soft,
      }}
    >
      <Text
        className="text-surface-dark"
        style={{
          fontSize: S.fs.md,
          
        }}
      >
        Total Balance
      </Text>

      <Text
        className="text-surface-dark"
        style={{
          fontSize: S.fs.lg,
          
          letterSpacing: -0.4,
        }}
      >
        {overview.totalBalanceLabel}
      </Text>
    </View>
  );
}

export const TransactionBalanceCard = memo(TransactionBalanceCardComponent);
