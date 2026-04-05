import React, { memo } from 'react';
import type { TransactionModel } from '../../../types/models';
import { TransactionRow } from '../../shared/TransactionRow';

type HomeTransactionItemProps = {
  item: TransactionModel;
};

function HomeTransactionItemComponent({ item }: HomeTransactionItemProps) {
  return <TransactionRow item={item} variant="preview" />;
}

export const HomeTransactionItem = memo(HomeTransactionItemComponent);
