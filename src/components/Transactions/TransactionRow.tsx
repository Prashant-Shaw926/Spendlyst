import React from 'react';
import { Text, View } from 'react-native';
import type { TransactionModel, TransactionSectionModel } from '../../types/models';
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

export type TransactionSection = TransactionSectionModel;

const ICONS: Record<TransactionModel['icon'], React.ComponentType<FinanceIconProps>> = {
  salary: StackCashIcon,
  groceries: BagIcon,
  rent: KeyIcon,
  transport: TransportIcon,
  food: ForkKnifeIcon,
  travel: TransportIcon,
  car: TransportIcon,
};

export function TransactionRow({
  item,
  isDark,
  isLast,
}: {
  item: TransactionModel;
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
          backgroundColor: item.iconBackgroundColor,
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
              {item.metaLabel}
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
                color: item.isExpense ? colors.blue700 : textPrimary,
                textAlign: 'right',
              }}
              numberOfLines={1}
            >
              {item.amountLabel}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
