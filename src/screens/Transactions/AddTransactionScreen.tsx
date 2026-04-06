import React, { useEffect } from 'react';
import { ScrollView, StatusBar, View, useColorScheme } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransactionForm } from '../../components/features/transactions/TransactionForm';
import { ArrowLeftIcon } from '../../components/shared/Icons';
import { Header } from '../../components/shared/Header';
import { IconButton } from '../../components/shared/IconButton';
import {
  selectHasHydrated,
  selectInitializeAppData,
} from '../../store/selectors/app.selectors';
import {
  selectAddTransaction,
  selectTransactionById,
  selectUpdateTransaction,
} from '../../store/selectors/transactions.selectors';
import { useAppStore } from '../../store/useAppStore';
import { darkColors, lightColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import type { TransactionsStackParamList } from '../../types/navigation';
import { moderateScale } from '../../utils/responsive';

export function AddTransactionScreen() {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<TransactionsStackParamList, 'AddTransaction'>>();
  const isDark = useColorScheme() === 'dark';
  const headerIconColor = isDark ? darkColors.text : lightColors.text;
  const statusBarBackgroundColor = isDark
    ? darkColors.background
    : lightColors.background;
  const hasHydrated = useAppStore(selectHasHydrated);
  const initializeAppData = useAppStore(selectInitializeAppData);
  const addTransaction = useAppStore(selectAddTransaction);
  const updateTransaction = useAppStore(selectUpdateTransaction);
  const transaction = useAppStore(
    selectTransactionById(route.params?.transactionId),
  );

  useEffect(() => {
    if (hasHydrated) {
      initializeAppData();
    }
  }, [hasHydrated, initializeAppData]);

  return (
    <SafeAreaView
      className="flex-1 bg-bg"
      edges={['top']}
      style={{ gap: S.space.lg }}
    >
      <StatusBar
        backgroundColor={statusBarBackgroundColor}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <Header
        variant="centerTitle"
        title={transaction ? 'Edit Transaction' : 'Add Transaction'}
        titleClassName="text-text"
        contentStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
        leftAction={
          <IconButton
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
            size={moderateScale(40)}
          >
            <ArrowLeftIcon color={headerIconColor} size={24} />
          </IconButton>
        }
      />

      <View
        className="flex-1 overflow-hidden bg-secondary-bg"
        style={{
          borderTopLeftRadius: moderateScale(72),
          borderTopRightRadius: moderateScale(72),
          paddingVertical: S.space.lg,
        }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: S.space.paddingHorizontal,
            paddingVertical: moderateScale(40),
          }}
          showsVerticalScrollIndicator={false}
        >
          <TransactionForm
            initialTransaction={transaction}
            submitLabel={transaction ? 'Save Changes' : 'Create Transaction'}
            onSubmit={payload => {
              if (transaction) {
                updateTransaction(transaction.id, payload);
              } else {
                addTransaction(payload);
              }

              navigation.goBack();
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
