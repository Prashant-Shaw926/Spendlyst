import React from 'react';
import { Text, View } from 'react-native';
import { S } from '../../theme/scale';

export type BalanceCardProps = {
  balanceLabel: string;
  balanceValue: string;
  expenseLabel: string;
  expenseValue: string;
};

export function BalanceCard({
  balanceLabel,
  balanceValue,
  expenseLabel,
  expenseValue,
}: BalanceCardProps) {
  return (
    <View
      style={{
        paddingHorizontal: S.space.paddingHorizontal,
        marginTop: S.space.sm,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text
            className="text-text-muted font-poppins"
            style={{
              fontSize: S.fs.xxs,
              fontFamily: 'Poppins-Regular',
              marginBottom: 4,
            }}
          >
            {balanceLabel}
          </Text>
          <Text
            className="text-text font-poppins"
            style={{
              fontSize: S.fs.xl,
              fontFamily: 'Poppins-Bold',
            }}
          >
            {balanceValue}
          </Text>
        </View>

        <View
          className="bg-border"
          style={{
            width: 1,
            height: S.space['2xl'],
            marginHorizontal: S.space.md,
          }}
        />

        <View style={{ flex: 1 }}>
          <Text
            className="text-text-muted font-poppins"
            style={{
              fontSize: S.fs.xxs,
              fontFamily: 'Poppins-Regular',
              marginBottom: 4,
            }}
          >
            {expenseLabel}
          </Text>
          <Text
            className="text-finance-expense font-poppins"
            style={{
              fontSize: S.fs.xl,
              fontFamily: 'Poppins-Bold',
            }}
          >
            {expenseValue}
          </Text>
        </View>
      </View>
    </View>
  );
}
