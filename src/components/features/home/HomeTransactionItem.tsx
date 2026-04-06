import React, { memo } from 'react';
import type { TransactionModel } from '../../../types/models';
import { TransactionRow } from '../../shared/TransactionRow';

type HomeTransactionItemProps = {
  item: TransactionModel;
  onPress?: () => void;
};

function HomeTransactionItemComponent({ item, onPress }: HomeTransactionItemProps) {
  return <TransactionRow item={item} variant="detailed" onPress={onPress} />;
}

export const HomeTransactionItem = memo(HomeTransactionItemComponent);
