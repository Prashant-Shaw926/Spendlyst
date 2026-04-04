import React, { memo } from 'react';
import type { SvgProps } from 'react-native-svg';
import { Text, View } from 'react-native';
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
  isDark: boolean;
  variant: TransactionRowVariant;
  isLast?: boolean;
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
  isDark,
  variant,
  isLast = false,
}: TransactionRowProps) {
  if (variant === 'preview') {
    const Icon = PREVIEW_ICONS[item.icon] ?? SalaryIcon;
    const iconColor = isDark ? colors.primary50 : colors.card;

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(14) }}>
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

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: moderateScale(12),
          }}
        >
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

  const Icon = DETAILED_ICONS[item.icon] ?? StackCashIcon;
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

export const TransactionRow = memo(TransactionRowComponent);
