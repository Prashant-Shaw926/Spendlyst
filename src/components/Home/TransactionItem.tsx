import React from 'react';
import type { SvgProps } from 'react-native-svg';
import { Text, View, useColorScheme } from 'react-native';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

export type HomeTransaction = {
  id: string;
  title: string;
  time: string;
  category: string;
  amount: string;
  isExpense?: boolean;
  iconBackgroundClassName: string;
  Icon: React.ComponentType<SvgProps>;
};

type TransactionItemProps = {
  item: HomeTransaction;
};

export function TransactionItem({ item }: TransactionItemProps) {
  const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? colors.primary50 : colors.card;

  return (
    <View className="flex-row items-center" style={{ gap: moderateScale(14) }}>
      <View
        className={`${item.iconBackgroundClassName} rounded-full items-center justify-center`}
        style={{
          width: moderateScale(56),
          height: moderateScale(56),
        }}
      >
        <item.Icon
          color={iconColor}
          height={moderateScale(24)}
          width={moderateScale(24)}
        />
      </View>

      <View className="flex-1 flex-row items-center justify-between" style={{ gap: moderateScale(12) }}>
        <View style={{ flex: 1, gap: moderateScale(4) }}>
          <Text
            className="text-text font-poppins"
            numberOfLines={1}
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: S.fs.md,
              lineHeight: moderateScale(22),
            }}
          >
            {item.title}
          </Text>

          <Text
            className="text-finance-expense font-poppins"
            numberOfLines={1}
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: S.fs.xs,
            }}
          >
            {item.time}
          </Text>
        </View>

        <View
          className="bg-primary-500"
          style={{
            width: 1,
            height: moderateScale(42),
          }}
        />

        <View className="items-start" style={{ width: moderateScale(64) }}>
          <Text
            className="text-text-muted font-poppins"
            numberOfLines={1}
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: S.fs.sm,
            }}
          >
            {item.category}
          </Text>
        </View>

        <View
          className="bg-primary-500"
          style={{
            width: 1,
            height: moderateScale(42),
          }}
        />

        <View className="items-end" style={{ width: moderateScale(92) }}>
          <Text
            className={`${item.isExpense ? 'text-finance-expense' : 'text-text'} font-poppins`}
            numberOfLines={1}
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: S.fs.md,
              lineHeight: moderateScale(22),
            }}
          >
            {item.amount}
          </Text>
        </View>
      </View>
    </View>
  );
}
