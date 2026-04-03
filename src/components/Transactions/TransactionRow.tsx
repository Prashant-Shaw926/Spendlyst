import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';
import type { FinanceIconProps } from '../shared/FinanceIcons';
import {
  BagIcon,
  ForkKnifeIcon,
  KeyIcon,
  StackCashIcon,
  TransportIcon,
} from '../shared/FinanceIcons';

type TransactionIconKey = 'salary' | 'groceries' | 'rent' | 'transport' | 'food';

export interface Transaction {
  id: string;
  title: string;
  meta: string;
  category: string;
  amount: string;
  isNegative: boolean;
  iconBg: string;
  icon: TransactionIconKey;
}

export type TransactionSection = {
  title: string;
  items: Transaction[];
};

const ICONS: Record<TransactionIconKey, React.ComponentType<FinanceIconProps>> = {
  salary: StackCashIcon,
  groceries: BagIcon,
  rent: KeyIcon,
  transport: TransportIcon,
  food: ForkKnifeIcon,
};

export const TRANSACTION_SECTIONS: TransactionSection[] = [
  {
    title: 'April',
    items: [
      {
        id: '1',
        title: 'Salary',
        meta: '18:27 - April 30',
        category: 'Monthly',
        amount: '$4.000,00',
        isNegative: false,
        iconBg: '#67ABF3',
        icon: 'salary',
      },
      {
        id: '2',
        title: 'Groceries',
        meta: '17:00 - April 24',
        category: 'Pantry',
        amount: '-$100,00',
        isNegative: true,
        iconBg: '#3790F9',
        icon: 'groceries',
      },
      {
        id: '3',
        title: 'Rent',
        meta: '8:30 - April 15',
        category: 'Rent',
        amount: '-$674,40',
        isNegative: true,
        iconBg: '#0D6CFF',
        icon: 'rent',
      },
      {
        id: '4',
        title: 'Transport',
        meta: '9:30 - April 08',
        category: 'Fuel',
        amount: '-$4,13',
        isNegative: true,
        iconBg: '#2E8FFF',
        icon: 'transport',
      },
    ],
  },
  {
    title: 'March',
    items: [
      {
        id: '5',
        title: 'Food',
        meta: '19:30 - March 31',
        category: 'Dinner',
        amount: '-$70,40',
        isNegative: true,
        iconBg: '#67ABF3',
        icon: 'food',
      },
    ],
  },
];

export function TransactionRow({
  item,
  isDark,
  isLast,
}: {
  item: Transaction;
  isDark: boolean;
  isLast: boolean;
}) {
  const Icon = ICONS[item.icon];
  const textPrimary = isDark ? colors.card : colors.surfaceDark;
  const textMuted = isDark ? 'rgba(255,255,255,0.8)' : colors.surfaceDark;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: isLast ? 0 : moderateScale(18),
      }}
    >
      <View
        style={{
          width: moderateScale(56),
          height: moderateScale(56),
          borderRadius: moderateScale(18),
          backgroundColor: item.iconBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon color={colors.card} size={24} />
      </View>

      <View style={{ flex: 1, marginLeft: S.space.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1.4, paddingRight: S.space.md }}>
            <Text
              style={{
                fontSize: S.fs.md,
                fontFamily: 'Poppins-SemiBold',
                color: textPrimary,
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-SemiBold',
                color: colors.blue700,
              }}
              numberOfLines={1}
            >
              {item.meta}
            </Text>
          </View>

          <View
            style={{
              width: 1,
              alignSelf: 'stretch',
              backgroundColor: colors.primary500,
              opacity: 0.75,
            }}
          />

          <View style={{ flex: 1, paddingHorizontal: S.space.md }}>
            <Text
              style={{
                fontSize: S.fs.sm,
                fontFamily: 'Poppins-Regular',
                color: textMuted,
              }}
              numberOfLines={1}
            >
              {item.category}
            </Text>
          </View>

          <View
            style={{
              width: 1,
              alignSelf: 'stretch',
              backgroundColor: colors.primary500,
              opacity: 0.75,
            }}
          />

          <View style={{ minWidth: moderateScale(88), paddingLeft: S.space.md }}>
            <Text
              style={{
                fontSize: S.fs.md,
                fontFamily: 'Poppins-SemiBold',
                color: item.isNegative ? colors.blue700 : textPrimary,
                textAlign: 'right',
              }}
              numberOfLines={1}
            >
              {item.amount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
