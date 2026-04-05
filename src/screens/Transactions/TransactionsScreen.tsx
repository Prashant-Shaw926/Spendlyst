import React, { useEffect } from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransactionBalanceCard } from '../../components/features/transactions/TransactionBalanceCard';
import { TransactionMonthSection } from '../../components/features/transactions/TransactionMonthSection';
import { BudgetOverview } from '../../components/shared/BudgetOverview';
import {
  ArrowLeftIcon,
  BellIcon,
  CheckSquareIcon,
} from '../../components/shared/FinanceIcons';
import { Header } from '../../components/shared/Header';
import { IconButton } from '../../components/shared/IconButton';
import { ScreenState } from '../../components/shared/ScreenState';
import { TransactionsScreenSkeleton } from '../../components/shared/TransactionsScreenSkeleton';
import {
  selectFetchTransactions,
  selectTransactionsByMonth,
  selectTransactionsScreenState,
} from '../../store/selectors/transactions.selectors';
import { useAppStore } from '../../store/useAppStore';
import { colors, getSemanticColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import type { TransactionsStackParamList } from '../../types/navigation';
import { moderateScale } from '../../utils/responsive';

export function TransactionsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TransactionsStackParamList>>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {
    transactionOverview,
    transactionsError,
    hasTransactions,
    isInitialLoading,
    isRefreshing,
  } = useAppStore(selectTransactionsScreenState);
  const sections = useAppStore(selectTransactionsByMonth);
  const fetchTransactions = useAppStore(selectFetchTransactions);

  const semanticColors = getSemanticColors(isDark);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={semanticColors.background}
      />

      {isInitialLoading ? <TransactionsScreenSkeleton /> : null}

      {!hasTransactions && transactionsError ? (
        <ScreenState
          mode="error"
          title="Unable To Load Transactions"
          message={transactionsError}
          onRetry={() => {
            fetchTransactions({ force: true });
          }}
        />
      ) : null}

                  <Header
              variant="centerTitle"
              title="Transaction"
              titleClassName="text-text"
              contentStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
              leftAction={
                <IconButton
                  accessibilityLabel="Go back"
                  disabled={!navigation.canGoBack()}
                  onPress={() => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    }
                  }}
                  size={moderateScale(40)}
                  style={{
                    opacity: navigation.canGoBack() ? 1 : 0.95,
                  }}
                >
                  <ArrowLeftIcon color={semanticColors.text} size={24} />
                </IconButton>
              }
            rightAction={
                <IconButton
                  accessibilityLabel="Open notifications"
                  className="items-center justify-center bg-pill"
                  borderRadius={moderateScale(21)}
                  onPress={() => navigation.navigate('Notification')}
                  size={moderateScale(40)}
                >
                  <BellIcon color={semanticColors.title} size={moderateScale(18)} />
                </IconButton>
              }
            />

      {transactionOverview ? (
        <ScrollView
          style={{ flex: 1 }}
          // contentContainerStyle={{ paddingBottom: S.space['4xl'] }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                fetchTransactions({ force: true });
              }}
              colors={[colors.primary500]}
              tintColor={colors.primary500}
              progressBackgroundColor={colors.card}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingHorizontal: moderateScale(36),
            paddingVertical: S.space.md,
            gap: moderateScale(26),
            }}
          >


            <View>
              <TransactionBalanceCard overview={transactionOverview} />
            </View>

            <View>
              <BudgetOverview
                leftMetric={{
                  label: 'Total Balance',
                  value: transactionOverview.totalBalanceLabel,
                  labelClassName: 'text-text',
                  valueClassName: 'text-text',
                  icon: <CheckSquareIcon color={semanticColors.text} size={13} />,
                }}
                rightMetric={{
                  label: 'Total Expense',
                  value: transactionOverview.totalExpenseLabel,
                  labelClassName: 'text-text',
                  valueClassName: 'text-finance-expense',
                  icon: <CheckSquareIcon color={semanticColors.text} size={13} />,
                }}
                progressPercent={transactionOverview.spentPercent}
                progressValue={transactionOverview.budgetLabel}
                note={transactionOverview.note}
                noteClassName="text-text"
                noteIconColor={semanticColors.text}
                dividerClassName="bg-primary-50"
              />
            </View>
          </View>

          <View
            className="bg-secondary-bg"
            style={{
              marginTop: moderateScale(10),
              borderTopLeftRadius: moderateScale(72),
              borderTopRightRadius: moderateScale(72),
              paddingTop: moderateScale(28),
              paddingHorizontal: moderateScale(36),
              paddingBottom: moderateScale(34),
            }}
          >
            <View style={{ gap: S.space['2xl'] }}>
              {sections.map((section) => (
                <TransactionMonthSection
                  key={section.title}
                  section={section}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}
