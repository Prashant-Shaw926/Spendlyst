import React, { memo } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
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
import type { FinanceIconProps } from './Icons';
import {
  BagIcon,
  ForkKnifeIcon,
  KeyIcon,
  StackCashIcon,
  TransportIcon,
} from './Icons';

export type TransactionRowVariant = 'preview' | 'detailed';

type TransactionRowProps = {
  item: TransactionModel;
  variant: TransactionRowVariant;
  onPress?: () => void;
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
  onPress,
}: TransactionRowProps) {
  const isDark = useColorScheme() === 'dark';
  const Container = onPress ? TouchableOpacity : View;
  const containerProps = onPress
    ? {
        accessibilityRole: 'button' as const,
        activeOpacity: 1,
        onPress,
      }
    : {};

  if (variant === 'preview') {
    const Icon = PREVIEW_ICONS[item.icon] ?? SalaryIcon;
    const iconColor = isDark ? colors.primary50 : colors.white;

    return (
      <Container
        className="flex-row items-center"
        style={{ gap: S.space.md }}
        {...containerProps}
      >
        <View
          className="items-center justify-center"
          style={{
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(999),
            backgroundColor: item.iconBackgroundColor,
          }}
        >
          <Icon color={iconColor} height={S.icon.lg} width={S.icon.lg} />
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
                fontSize: S.fs.xs,
              }}
            >
              {item.metaLabel}
            </Text>
          </View>

          <View className="items-end">
            <Text
              className={item.isExpense ? 'text-finance-expense' : 'text-text'}
              numberOfLines={1}
              style={{
                fontSize: S.fs.md,
                lineHeight: S.fs.md * 1.35,
              }}
            >
              {item.amountLabel}
            </Text>
          </View>
        </View>
      </Container>
    );
  }

  const Icon = DETAILED_ICONS[item.icon] ?? StackCashIcon;

  return (
    <Container
      className="flex-row items-center"
      style={{ gap: S.space.md }}
      {...containerProps}
    >
      <View
        className="items-center justify-center bg-blue-500"
        style={{
          width: S.size.avatarMd,
          height: S.size.avatarMd,
          borderRadius: moderateScale(999),
        }}
      >
        <Icon color={colors.white} size={24} />
      </View>

      <View
        className="flex-1 flex-row items-center"
        style={{ gap: S.space.sm }}
      >
        <View className="flex-1" style={{ gap: S.space.xs }}>
          <Text
            className="text-text"
            numberOfLines={1}
            style={{
              fontSize: S.fs.md,
            }}
          >
            {item.title}
          </Text>

          <Text
            className="text-text"
            numberOfLines={1}
            style={{
              fontSize: S.fs.xs,
            }}
          >
            {item.metaLabel}
          </Text>
        </View>

        <View className="items-end">
          <Text
            className={item.isExpense ? 'text-finance-expense' : 'text-text'}
            numberOfLines={1}
            style={{
              fontSize: S.fs.md,

              textAlign: 'right',
            }}
          >
            {item.amountLabel}
          </Text>
        </View>
      </View>
    </Container>
  );
}

export const TransactionRow = memo(TransactionRowComponent);
