import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { transactionCategorySuggestions } from '../../constants/finance';
import { TransactionBalanceCard } from '../../components/features/transactions/TransactionBalanceCard';
import { BudgetOverview } from '../../components/shared/BudgetOverview';
import {
  ArrowDownRightIcon,
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BellIcon,
  CheckSquareIcon,
  PlusIcon,
} from '../../components/shared/FinanceIcons';
import { Header } from '../../components/shared/Header';
import { IconButton } from '../../components/shared/IconButton';
import { PillChip } from '../../components/shared/PillChip';
import { TextField } from '../../components/shared/TextField';
import { TransactionRow } from '../../components/shared/TransactionRow';
import { TransactionsScreenSkeleton } from '../../components/shared/TransactionsScreenSkeleton';
import {
  selectHasHydrated,
  selectHasInitializedData,
  selectInitializeAppData,
} from '../../store/selectors/app.selectors';
import {
  selectAllTransactions,
  selectTransactionCategories,
  selectTransactionOverview,
} from '../../store/selectors/transactions.selectors';
import { useAppStore } from '../../store/useAppStore';
import { colors, getSemanticColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import {
  buildTransactionCollections,
  mapTransactionsToSections,
} from '../../utils/finance';
import { moderateScale } from '../../utils/responsive';

type TypeFilter = 'All' | 'Income' | 'Expense';

const typeFilters: readonly TypeFilter[] = ['All', 'Income', 'Expense'];

export function TransactionsScreen() {
  const navigation = useNavigation<any>();
  const isDark = useColorScheme() === 'dark';
  const semanticColors = getSemanticColors(isDark);
  const hasHydrated = useAppStore(selectHasHydrated);
  const hasInitializedData = useAppStore(selectHasInitializedData);
  const initializeAppData = useAppStore(selectInitializeAppData);
  const transactions = useAppStore(selectAllTransactions);
  const transactionOverview = useAppStore(selectTransactionOverview);
  const dynamicCategories = useAppStore(selectTransactionCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    if (hasHydrated) {
      initializeAppData();
    }
  }, [hasHydrated, initializeAppData]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(['All', ...dynamicCategories, ...transactionCategorySuggestions]),
    );
  }, [dynamicCategories]);

  const filteredTransactions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return transactions.filter(transaction => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        transaction.title.toLowerCase().includes(normalizedQuery) ||
        transaction.category.toLowerCase().includes(normalizedQuery) ||
        transaction.notes.toLowerCase().includes(normalizedQuery);
      const matchesType =
        typeFilter === 'All' || transaction.type === typeFilter.toLowerCase();
      const matchesCategory =
        categoryFilter === 'All' ||
        transaction.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesQuery && matchesType && matchesCategory;
    });
  }, [categoryFilter, searchQuery, transactions, typeFilter]);

  const filteredSections = useMemo(() => {
    const filteredCollections =
      buildTransactionCollections(filteredTransactions);

    return mapTransactionsToSections(
      filteredCollections.transactionMonthIds,
      filteredCollections.transactionIdsByMonth,
      filteredCollections.transactionsById,
    );
  }, [filteredTransactions]);

  const isBootstrapping = !hasHydrated || !hasInitializedData;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']} style={{ gap: S.space.md }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={semanticColors.background}
      />

      {isBootstrapping ? <TransactionsScreenSkeleton /> : null}

      {!isBootstrapping && transactionOverview ? (
        <>
          <Header
            variant="centerTitle"
            title="Transactions"
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
                <BellIcon
                  color={semanticColors.title}
                  size={moderateScale(18)}
                />
              </IconButton>
            }
          />

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{ paddingBottom: S.space['4xl'] }}
          >
            <View
              style={{
                gap: S.space.xl,
                paddingHorizontal: S.space.paddingHorizontal,
                paddingVertical: S.space.md,
              }}
            >
              <TransactionBalanceCard overview={transactionOverview} />

              <BudgetOverview
                leftMetric={{
                  label: 'Total Balance',
                  value: transactionOverview.totalIncomeLabel,
                  labelClassName: 'text-text',
                  valueClassName: 'text-text',
                  icon: (
                    <ArrowUpRightIcon color={semanticColors.text} size={15} />
                  ),
                }}
                rightMetric={{
                  label: 'Total Expense',
                  value: transactionOverview.totalExpenseLabel,
                  labelClassName: 'text-text',
                  valueClassName: 'text-finance-expense',
                  icon: (
                    <ArrowDownRightIcon color={semanticColors.text} size={15} />
                  ),
                }}
                progressPercent={transactionOverview.spentPercent}
                progressValue={transactionOverview.budgetLabel}
                note={transactionOverview.note}
                noteClassName="text-text"
                noteIconColor={semanticColors.text}
                dividerClassName="bg-primary-50"
              />
            </View>

            <View
              className="bg-secondary-bg"
              style={{
                borderTopLeftRadius: moderateScale(72),
                borderTopRightRadius: moderateScale(72),
                gap: S.space.xl,
                // marginTop: moderateScale(14),
                paddingHorizontal: S.space.paddingHorizontal,
                paddingTop: S.space['2xl'],
                paddingBottom: S.space['4xl'],
              }}
            >
              <View style={{ gap: S.space.lg }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: S.space.md,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <TextField
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      placeholder="Search title, category..."
                    />
                  </View>

                  <TouchableOpacity
                    accessibilityRole="button"
                    activeOpacity={0.88}
                    onPress={() => navigation.navigate('AddTransaction')}
                    style={{
                      alignItems: 'center',
                      backgroundColor: colors.primary500,
                      borderRadius: S.radius.lg,
                      justifyContent: 'center',
                      // marginTop: moderateScale(28),
                                    height: moderateScale(44),
                                    width: moderateScale(44),
                    }}
                  >
                    <PlusIcon color={colors.surfaceDark} size={22} />
                  </TouchableOpacity>

                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: S.space.sm,
                    paddingRight: S.space.paddingHorizontal,
                  }}
                >
                  {typeFilters.map(filter => (
                    <PillChip
                      key={filter}
                      label={filter}
                      active={filter === typeFilter && categoryFilter === 'All'}
                      onPress={() => {
                        setTypeFilter(filter);
                        setCategoryFilter('All');
                      }}
                    />
                  ))}
                  {categories.slice(1, 5).map(category => (
                    <PillChip
                      key={category}
                      label={category}
                      active={category === categoryFilter}
                      onPress={() => {
                        setCategoryFilter(category);
                        setTypeFilter('All');
                      }}
                    />
                  ))}
                </ScrollView>
              </View>

              <View style={{ gap: S.space['2xl'] }}>
                {filteredSections.length > 0 ? (
                  filteredSections.map(section => (
                    <View key={section.title} style={{ gap: S.space.lg }}>
                      <Text
                        className="text-title"
                        style={{
                          fontFamily: 'Poppins-Bold',
                          fontSize: S.fs.lg,
                        }}
                      >
                        {section.title}
                      </Text>

                      <View style={{ gap: S.space.lg }}>
                        {section.items.map(transaction => (
                          <TransactionRow
                            key={transaction.id}
                            item={transaction}
                            variant="detailed"
                            onPress={() =>
                              navigation.navigate('TransactionDetail', {
                                transactionId: transaction.id,
                              })
                            }
                          />
                        ))}
                      </View>
                    </View>
                  ))
                ) : (
                  <View
                    className="bg-card"
                    style={{
                      borderRadius: S.radius.xxxl,
                      gap: S.space.sm,
                      paddingHorizontal: S.space.lg,
                      paddingVertical: S.space.xl,
                    }}
                  >
                    <Text
                      className="text-text"
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: S.fs.md_h,
                      }}
                    >
                      No transactions match these filters
                    </Text>
                    <Text
                      className="text-text-muted"
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: S.fs.sm,
                      }}
                    >
                      Try clearing the search, choosing a different category, or
                      adding a new entry.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
}
