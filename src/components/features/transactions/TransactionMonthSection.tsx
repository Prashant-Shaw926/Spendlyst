import React, { memo } from 'react';
import { Text, View } from 'react-native';
import type { TransactionSectionModel } from '../../../types/models';
import { colors } from '../../../theme/colors';
import { moderateScale } from '../../../utils/responsive';
import { TransactionRow } from '../../shared/TransactionRow';

type TransactionMonthSectionProps = {
  section: TransactionSectionModel;
  isDark: boolean;
  isLast: boolean;
};

function TransactionMonthSectionComponent({
  section,
  isDark,
  isLast,
}: TransactionMonthSectionProps) {
  return (
    <View
      style={{
        marginBottom: isLast ? 0 : moderateScale(26),
      }}
    >
      <Text
        style={{
          fontSize: moderateScale(22),
          fontFamily: 'Poppins-Bold',
          color: isDark ? colors.card : colors.surfaceDark,
          marginBottom: moderateScale(18),
          letterSpacing: -0.5,
        }}
      >
        {section.title}
      </Text>

      {section.items.map((item, index) => (
        <TransactionRow
          key={item.id}
          item={item}
          isDark={isDark}
          variant="detailed"
          isLast={index === section.items.length - 1}
        />
      ))}
    </View>
  );
}

export const TransactionMonthSection = memo(TransactionMonthSectionComponent);
