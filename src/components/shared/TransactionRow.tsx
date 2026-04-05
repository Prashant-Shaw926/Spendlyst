import React, { memo } from 'react';
import { Text, View, useColorScheme } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import {
  CarIcon,
  FoodIcon,
  GroceriesIcon,
  RentIcon,
  SalaryIcon,
  Transport,
} from '../../assets/icons';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import type { TransactionModel } from '../../types/models';
import { moderateScale } from '../../utils/responsive';
import type { FinanceIconProps } from './FinanceIcons';
import {
  BagIcon,
  ForkKnifeIcon,
  KeyIcon,
  StackCashIcon,
  TransportIcon,
} from './FinanceIcons';

export type TransactionRowVariant = 'preview' | 'detailed';

type TransactionRowProps = {
  item: TransactionModel;
  variant: TransactionRowVariant;
};

type AssetIcon = React.ComponentType<SvgProps>;

const PREVIEW_ICONS: Record<TransactionModel['icon'], AssetIcon> = {
  salary: SalaryIcon,
  groceries: GroceriesIcon,
  rent: RentIcon,
  transport: Transport,
  food: FoodIcon,
  travel: CarIcon,
  car: CarIcon,
};

const DETAILED_ICONS: Record<
  TransactionModel['icon'],
  React.ComponentType<FinanceIconProps>
> = {
  salary: StackCashIcon,
  groceries: BagIcon,
  rent: KeyIcon,
  transport: TransportIcon,
  food: ForkKnifeIcon,
  travel: TransportIcon,
  car: TransportIcon,
};

function TransactionRowComponent({
  item,
  variant,
}: TransactionRowProps) {
  const isDark = useColorScheme() === 'dark';

  if (variant === 'preview') {
    const Icon = PREVIEW_ICONS[item.icon] ?? SalaryIcon;
    const iconColor = isDark ? colors.primary50 : colors.card;

    return (
      <View className="flex-row items-center" style={{ gap: S.space.md }}>
        <View
          className="items-center justify-center"
          style={{
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(999),
            backgroundColor: item.iconBackgroundColor,
          }}
        >
          <Icon
            color={iconColor}
            height={S.icon.lg}
            width={S.icon.lg}
          />
        </View>

        <View
          className="flex-1 flex-row items-center"
          style={{ gap: S.space.md }}
        >
          <View className="flex-1" style={{ gap: S.space.xs }}>
            <Text
              className="text-text"
              numberOfLines={1}
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: S.fs.md,
                lineHeight: S.fs.md * 1.35,
              }}
            >
              {item.title}
            </Text>

            <Text
              className="text-finance-expense"
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
              className="text-text-muted"
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
              className={item.isExpense ? 'text-finance-expense' : 'text-text'}
              numberOfLines={1}
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: S.fs.md,
                lineHeight: S.fs.md * 1.35,
              }}
            >
              {item.amountLabel}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  const Icon = DETAILED_ICONS[item.icon] ?? StackCashIcon;

  return (
    <View className="flex-row items-center" style={{ gap: S.space.md }}>
      <View
        className="items-center justify-center"
        style={{
          width: moderateScale(56),
          height: moderateScale(56),
          borderRadius: S.radius.xl,
          backgroundColor: item.iconBackgroundColor,
        }}
      >
        <Icon color={colors.card} size={24} />
      </View>

      <View
        className="flex-1 flex-row items-center"
        style={{ gap: S.space.md }}
      >
        <View style={{ flex: 1.4, gap: S.space.xs }}>
          <Text
            className="text-text"
            numberOfLines={1}
            style={{
              fontSize: S.fs.md,
              fontFamily: 'Poppins-SemiBold',
            }}
          >
            {item.title}
          </Text>

          <Text
            className="text-blue-700"
            numberOfLines={1}
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-SemiBold',
            }}
          >
            {item.metaLabel}
          </Text>
        </View>

        <View
          className="self-stretch bg-primary-500"
          style={{
            width: 1,
            opacity: 0.75,
          }}
        />

        <View className="flex-1 items-start">
          <Text
            className="text-text-muted"
            numberOfLines={1}
            style={{
              fontSize: S.fs.sm,
              fontFamily: 'Poppins-Regular',
            }}
          >
            {item.category}
          </Text>
        </View>

        <View
          className="self-stretch bg-primary-500"
          style={{
            width: 1,
            opacity: 0.75,
          }}
        />

        <View className="items-end" style={{ minWidth: moderateScale(88) }}>
          <Text
            className={item.isExpense ? 'text-blue-700' : 'text-text'}
            numberOfLines={1}
            style={{
              fontSize: S.fs.md,
              fontFamily: 'Poppins-SemiBold',
              textAlign: 'right',
            }}
          >
            {item.amountLabel}
          </Text>
        </View>
      </View>
    </View>
  );
}

export const TransactionRow = memo(TransactionRowComponent);
