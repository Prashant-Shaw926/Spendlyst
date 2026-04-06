import React, { useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../components/shared/PrimaryButton';
import { ArrowLeftIcon } from '../../components/shared/FinanceIcons';
import { Header } from '../../components/shared/Header';
import { IconButton } from '../../components/shared/IconButton';
import {
  selectHasHydrated,
  selectInitializeAppData,
} from '../../store/selectors/app.selectors';
import {
  selectDeleteTransaction,
  selectTransactionById,
} from '../../store/selectors/transactions.selectors';
import { useAppStore } from '../../store/useAppStore';
import { getSemanticColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import type { TransactionsStackParamList } from '../../types/navigation';
import { moderateScale } from '../../utils/responsive';

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View
      style={{
        gap: S.space.xs,
      }}
    >
      <Text
        className="text-text-muted"
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: S.fs.xs,
        }}
      >
        {label}
      </Text>
      <Text
        className="text-text"
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: S.fs.md,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function TransactionDetailScreen() {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<TransactionsStackParamList, 'TransactionDetail'>>();
  const isDark = useColorScheme() === 'dark';
  const semanticColors = getSemanticColors(isDark);
  const hasHydrated = useAppStore(selectHasHydrated);
  const initializeAppData = useAppStore(selectInitializeAppData);
  const deleteTransaction = useAppStore(selectDeleteTransaction);
  const transaction = useAppStore(selectTransactionById(route.params.transactionId));

  useEffect(() => {
    if (hasHydrated) {
      initializeAppData();
    }
  }, [hasHydrated, initializeAppData]);

  useEffect(() => {
    if (hasHydrated && !transaction) {
      navigation.goBack();
    }
  }, [hasHydrated, navigation, transaction]);

  if (!transaction) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        backgroundColor={semanticColors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <Header
        variant="centerTitle"
        title="Transaction Detail"
        titleClassName="text-text"
        contentStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
        leftAction={
          <IconButton
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
            size={moderateScale(40)}
          >
            <ArrowLeftIcon color={semanticColors.text} size={24} />
          </IconButton>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: S.space.xl,
          paddingHorizontal: S.space.paddingHorizontal,
          paddingVertical: S.space.md,
          paddingBottom: S.space['4xl'],
        }}
      >
        <View
          className="bg-card"
          style={{
            borderRadius: S.radius.xxxl,
            gap: S.space.md,
            paddingHorizontal: S.space.lg,
            paddingVertical: S.space.xl,
          }}
        >
          <Text
            className="text-text-muted"
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: S.fs.sm,
            }}
          >
            {transaction.type === 'expense' ? 'Expense entry' : 'Income entry'}
          </Text>

          <Text
            className={transaction.isExpense ? 'text-finance-expense' : 'text-text'}
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: S.fs.xl,
            }}
          >
            {transaction.amountLabel}
          </Text>

          <Text
            className="text-text"
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: S.fs.md_h,
            }}
          >
            {transaction.title}
          </Text>

          <Text
            className="text-text-muted"
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: S.fs.sm,
            }}
          >
            {transaction.metaLabel}
          </Text>
        </View>

        <View
          className="bg-card"
          style={{
            borderRadius: S.radius.xxxl,
            gap: S.space.lg,
            paddingHorizontal: S.space.lg,
            paddingVertical: S.space.xl,
          }}
        >
          <DetailRow label="Category" value={transaction.category} />
          <DetailRow label="Date" value={transaction.dateLabel} />
          <DetailRow label="Type" value={transaction.type} />
          <DetailRow
            label="Notes"
            value={transaction.notes || 'No notes added for this transaction.'}
          />
        </View>

        <View style={{ gap: S.space.md }}>
          <PrimaryButton
            label="Edit Transaction"
            onPress={() =>
              navigation.navigate('AddTransaction', {
                transactionId: transaction.id,
              })
            }
          />
          <PrimaryButton
            label="Delete Transaction"
            variant="danger"
            onPress={() => {
              Alert.alert(
                'Delete transaction',
                'This entry will be removed from history and all dashboard totals.',
                [
                  {
                    style: 'cancel',
                    text: 'Cancel',
                  },
                  {
                    style: 'destructive',
                    text: 'Delete',
                    onPress: () => {
                      deleteTransaction(transaction.id);
                      navigation.goBack();
                    },
                  },
                ],
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
