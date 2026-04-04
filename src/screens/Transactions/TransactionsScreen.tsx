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
import { colors } from '../../theme/colors';
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

  const headerTextColor = isDark ? colors.card : colors.surfaceDark;
  const metricLabelColor = isDark ? 'rgba(255,255,255,0.8)' : colors.surfaceDark;
  const noteColor = isDark ? colors.card : colors.surfaceDark;
  const dividerColor = isDark
    ? 'rgba(255,255,255,0.34)'
    : 'rgba(255,255,255,0.84)';
  const screenBg = isDark ? colors.surfaceDeep : colors.primary500;
  const sheetBg = isDark ? colors.surfaceDark : colors.primary50;
  const bellBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(241,255,243,0.95)';
  const bellBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(5,34,36,0.08)';

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: screenBg }} edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={screenBg}
      />

      {isInitialLoading ? (
        <TransactionsScreenSkeleton isDark={isDark} />
      ) : null}

      {!hasTransactions && transactionsError ? (
        <ScreenState
          isDark={isDark}
          mode="error"
          title="Unable To Load Transactions"
          message={transactionsError}
          onRetry={() => {
            fetchTransactions({ force: true });
          }}
        />
      ) : null}

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
              paddingTop: S.space.md,
              paddingBottom: moderateScale(18),
            }}
          >
            <Header
              variant="centerTitle"
              title="Transaction"
              titleColor={headerTextColor}
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
                  <ArrowLeftIcon color={headerTextColor} size={24} />
                </IconButton>
              }
              rightAction={
                <IconButton
                  accessibilityLabel="Open notifications"
                  backgroundColor={bellBg}
                  borderColor={bellBorder}
                  borderRadius={moderateScale(20)}
                  borderWidth={1}
                  onPress={() => navigation.navigate('Notification')}
                  size={moderateScale(40)}
                >
                  <BellIcon color={colors.surfaceDark} size={20} />
                </IconButton>
              }
            />

            <View style={{ marginTop: moderateScale(26) }}>
              <TransactionBalanceCard overview={transactionOverview} />
            </View>

            <View style={{ marginTop: moderateScale(14) }}>
              <BudgetOverview
                leftMetric={{
                  label: 'Total Balance',
                  value: transactionOverview.totalBalanceLabel,
                  labelColor: metricLabelColor,
                  valueColor: colors.card,
                  icon: <CheckSquareIcon color={metricLabelColor} size={13} />,
                }}
                rightMetric={{
                  label: 'Total Expense',
                  value: transactionOverview.totalExpenseLabel,
                  labelColor: metricLabelColor,
                  valueColor: colors.blue700,
                  icon: <CheckSquareIcon color={metricLabelColor} size={13} />,
                }}
                progressPercent={transactionOverview.spentPercent}
                progressValue={transactionOverview.budgetLabel}
                note={transactionOverview.note}
                noteColor={noteColor}
                noteIconColor={metricLabelColor}
                dividerStyle={{
                  marginHorizontal: moderateScale(18),
                  backgroundColor: dividerColor,
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: moderateScale(10),
              borderTopLeftRadius: moderateScale(72),
              borderTopRightRadius: moderateScale(72),
              backgroundColor: sheetBg,
              paddingTop: moderateScale(28),
              paddingHorizontal: moderateScale(36),
              paddingBottom: moderateScale(34),
            }}
          >
            {sections.map((section, sectionIndex) => (
              <TransactionMonthSection
                key={section.title}
                section={section}
                isDark={isDark}
                isLast={sectionIndex === sections.length - 1}
              />
            ))}
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}
