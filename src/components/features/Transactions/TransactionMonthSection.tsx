import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { S } from '../../../theme/scale';
import type { TransactionSectionModel } from '../../../types/models';
import { TransactionRow } from '../../shared/TransactionRow';

type TransactionMonthSectionProps = {
  section: TransactionSectionModel;
};

function TransactionMonthSectionComponent({ section }: TransactionMonthSectionProps) {
  return (
    <View style={{ gap: S.space.lg }}>
      <Text
        className="text-title"
        style={{
          fontSize: S.fs.lg,
          
          letterSpacing: -0.5,
        }}
      >
        {section.title}
      </Text>

      <View style={{ gap: S.space.lg }}>
        {section.items.map((item) => (
          <TransactionRow
            key={item.id}
            item={item}
            variant="detailed"
          />
        ))}
      </View>
    </View>
  );
}

export const TransactionMonthSection = memo(TransactionMonthSectionComponent);
