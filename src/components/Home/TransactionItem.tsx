import React from 'react';
import { Text, View, useColorScheme } from 'react-native';
import {
  CarIcon,
  FoodIcon,
  GroceriesIcon,
  RentIcon,
  SalaryIcon,
  Transport,
} from '../../assets/icons';
import type { TransactionModel } from '../../types/models';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

type TransactionItemProps = {
  item: TransactionModel;
};

const ICONS = {
  salary: SalaryIcon,
  groceries: GroceriesIcon,
  rent: RentIcon,
  transport: Transport,
  food: FoodIcon,
  travel: CarIcon,
  car: CarIcon,
} as const;

export function TransactionItem({ item }: TransactionItemProps) {
  const isDark = useColorScheme() === 'dark';
  const iconColor = isDark ? colors.primary50 : colors.card;
  const Icon = ICONS[item.icon] ?? SalaryIcon;

  return (
    <View className="flex-row items-center" style={{ gap: moderateScale(14) }}>
      <View
          style={{
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(999),
            backgroundColor: item.iconBackgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}
      >
        <Icon
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
            {item.metaLabel}
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
            {item.amountLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}
