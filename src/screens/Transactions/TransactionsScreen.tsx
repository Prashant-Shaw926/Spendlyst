import React, { useEffect } from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BalanceCard } from '../../components/Transactions/BalanceCard';
import { StatsCard } from '../../components/Transactions/StatsCard';
import { TransactionRow } from '../../components/Transactions/TransactionRow';
import { ScreenState } from '../../components/shared/ScreenState';
import { TransactionsScreenSkeleton } from '../../components/shared/TransactionsScreenSkeleton';
import { ArrowLeftIcon, BellIcon } from '../../components/shared/FinanceIcons';
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
  const screenBg = isDark ? colors.surfaceDeep : colors.primary500;
  const sheetBg = isDark ? colors.surfaceDark : colors.primary50;
  const bellBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(241,255,243,0.95)';
  const bellBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(5,34,36,0.08)';

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: screenBg }}>
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
          contentContainerStyle={{ paddingBottom: S.space['4xl'] }}
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                accessibilityLabel="Go back"
                accessibilityRole="button"
                disabled={!navigation.canGoBack()}
                onPress={() => {
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  }
                }}
                style={{
                  width: moderateScale(40),
                  height: moderateScale(40),
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: navigation.canGoBack() ? 1 : 0.95,
                }}
              >
                <ArrowLeftIcon color={headerTextColor} size={24} />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: moderateScale(22),
                  fontFamily: 'Poppins-Bold',
                  color: headerTextColor,
                  letterSpacing: -0.5,
                }}
              >
                Transaction
              </Text>

              <TouchableOpacity
                accessibilityLabel="Open notifications"
                accessibilityRole="button"
                onPress={() => navigation.navigate('Notification')}
                style={{
                  width: moderateScale(40),
                  height: moderateScale(40),
                  borderRadius: moderateScale(20),
                  backgroundColor: bellBg,
                  borderWidth: 1,
                  borderColor: bellBorder,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BellIcon color={colors.surfaceDark} size={20} />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: moderateScale(26) }}>
              <BalanceCard
                label="Total Balance"
                value={transactionOverview.totalBalanceLabel}
              />
            </View>

            <View style={{ marginTop: moderateScale(14) }}>
              <StatsCard
                isDark={isDark}
                balanceLabel="Total Balance"
                balanceValue={transactionOverview.totalBalanceLabel}
                expenseLabel="Total Expense"
                expenseValue={transactionOverview.totalExpenseLabel}
                progressPercent={transactionOverview.spentPercent}
                progressValue={transactionOverview.budgetLabel}
                note={transactionOverview.note}
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
              <View
                key={section.title}
                style={{
                  marginBottom:
                    sectionIndex === sections.length - 1 ? 0 : moderateScale(26),
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(22),
                    fontFamily: 'Poppins-Bold',
                    color: isDark ? colors.card : colors.surfaceDark,
                    marginBottom: moderateScale(18),
                    letterSpacing: -0.5,
                  }}
                >
                  {section.title}
                </Text>

                {section.items.map((item, index) => (
                  <TransactionRow
                    key={item.id}
                    item={item}
                    isDark={isDark}
                    isLast={index === section.items.length - 1}
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

