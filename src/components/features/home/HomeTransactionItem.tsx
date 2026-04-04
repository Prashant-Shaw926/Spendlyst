import React, { memo } from 'react';
import type { TransactionModel } from '../../../types/models';
import { TransactionRow } from '../../shared/TransactionRow';

type HomeTransactionItemProps = {
  item: TransactionModel;
  isDark: boolean;
};

function HomeTransactionItemComponent({
  item,
  isDark,
}: HomeTransactionItemProps) {
  return (
    <TransactionRow
      item={item}
      isDark={isDark}
      variant="preview"
    />
  );
}

export const HomeTransactionItem = memo(HomeTransactionItemComponent);
