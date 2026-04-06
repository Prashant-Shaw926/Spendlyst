import React, { useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IncomeExpenseBarChart } from '../../components/features/insights/IncomeExpenseBarChart';
import { InsightsSummaryStats } from '../../components/features/insights/InsightsSummaryStats';
import { TargetCard } from '../../components/features/insights/TargetCard';
import { BudgetOverview } from '../../components/shared/BudgetOverview';
import { ChartSection } from '../../components/shared/ChartSection';
import {
  ArrowDownRightIcon,
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BellIcon,
} from '../../components/shared/FinanceIcons';
import { Header } from '../../components/shared/Header';
import { IconButton } from '../../components/shared/IconButton';
import { InsightsScreenSkeleton } from '../../components/shared/InsightsScreenSkeleton';
import {
  selectHasHydrated,
  selectHasInitializedData,
  selectInitializeAppData,
} from '../../store/selectors/app.selectors';
import { selectInsightsDashboard } from '../../store/selectors/insights.selectors';
import { useAppStore } from '../../store/useAppStore';
import { getSemanticColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

function InsightCard({
  title,
  value,
  helper,
}: {
  title: string;
  value: string;
  helper: string;
}) {
  return (
    <View
      className="bg-secondary-card"
      style={{
        borderRadius: S.radius.xxxl,
        flex: 1,
        gap: S.space.sm,
        paddingHorizontal: S.space.lg,
        paddingVertical: S.space.lg,
      }}
    >
      <Text
        className="text-text-muted"
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: S.fs.xs,
        }}
      >
        {title}
      </Text>
      <Text
        className="text-text"
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: S.fs.md_h,
        }}
      >
        {value}
      </Text>
      <Text
        className="text-text-muted"
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: S.fs.xs,
        }}
      >
        {helper}
      </Text>
    </View>
  );
}

export function InsightsScreen() {
  const navigation = useNavigation<any>();
  const isDark = useColorScheme() === 'dark';
  const semanticColors = getSemanticColors(isDark);
  const hasHydrated = useAppStore(selectHasHydrated);
  const hasInitializedData = useAppStore(selectHasInitializedData);
  const initializeAppData = useAppStore(selectInitializeAppData);
  const insights = useAppStore(selectInsightsDashboard);

  useEffect(() => {
    if (hasHydrated) {
      initializeAppData();
    }
  }, [hasHydrated, initializeAppData]);

  const isBootstrapping = !hasHydrated || !hasInitializedData;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={semanticColors.background}
      />

      {isBootstrapping ? <InsightsScreenSkeleton /> : null}

      {!isBootstrapping ? (
        <>
          <Header
            variant="centerTitle"
            title="Insights"
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
                <BellIcon color={semanticColors.title} size={moderateScale(18)} />
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
              <BudgetOverview
                leftMetric={{
                  label: 'Total Balance',
                  value: insights.overview.totalBalanceLabel,
                  labelClassName: 'text-text',
                  valueClassName: 'text-text',
                  icon: <ArrowUpRightIcon color={semanticColors.text} size={15} />,
                }}
                rightMetric={{
                  label: 'Total Expense',
                  value: insights.overview.totalExpenseLabel,
                  labelClassName: 'text-text',
                  valueClassName: 'text-finance-expense',
                  icon: <ArrowDownRightIcon color={semanticColors.text} size={15} />,
                }}
                progressPercent={insights.overview.spentPercent}
                progressValue={insights.overview.budgetLabel}
                note={insights.overview.note}
                noteClassName="text-text"
                noteIconColor={semanticColors.text}
                dividerClassName="bg-primary-50"
              />
            </View>

            <View
              className="bg-card"
              style={{
                borderTopLeftRadius: moderateScale(72),
                borderTopRightRadius: moderateScale(72),
                gap: S.space.xl,
                marginTop: moderateScale(16),
                paddingHorizontal: S.space.paddingHorizontal,
                paddingTop: S.space['2xl'],
                paddingBottom: S.space['4xl'],
              }}
            >
              <ChartSection
                title="Monthly trend"
                titleClassName="text-surface-dark"
                titleStyle={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: S.fs.md_h,
                }}
                containerClassName="bg-primary-100"
                containerStyle={{
                  borderRadius: S.radius.xxxl,
                }}
              >
                {({ width }) =>
                  width > 0 ? (
                    <IncomeExpenseBarChart
                      width={width - S.space['2xl']}
                      height={moderateScale(168)}
                      data={insights.monthlyTrend}
                    />
                  ) : null
                }
              </ChartSection>

              <InsightsSummaryStats summary={insights.summary} />

              <View style={{ flexDirection: 'row', gap: S.space.md }}>
                <InsightCard
                  title={insights.highestSpendingCategory.title}
                  value={insights.highestSpendingCategory.value}
                  helper={insights.highestSpendingCategory.helper}
                />
                <InsightCard
                  title="Week vs last week"
                  value={insights.weekComparison.deltaLabel}
                  helper={insights.weekComparison.helper}
                />
              </View>

              <InsightCard
                title={insights.dominantTransactionType.title}
                value={insights.dominantTransactionType.value}
                helper={insights.dominantTransactionType.helper}
              />

              <View style={{ gap: S.space.md }}>
                <Text
                  className="text-text"
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: S.fs.md_h,
                  }}
                >
                  Spending by category
                </Text>

                <View style={{ gap: S.space.md }}>
                  {insights.categoryBreakdown.map((item) => (
                    <View
                      key={item.category}
                      className="bg-secondary-card"
                      style={{
                        borderRadius: S.radius.xxxl,
                        gap: S.space.sm,
                        paddingHorizontal: S.space.lg,
                        paddingVertical: S.space.lg,
                      }}
                    >
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text
                          className="text-text"
                          style={{
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: S.fs.md,
                          }}
                        >
                          {item.category}
                        </Text>
                        <Text
                          className="text-text"
                          style={{
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: S.fs.sm,
                          }}
                        >
                          {item.amountLabel}
                        </Text>
                      </View>

                      <View
                        className="bg-primary-50"
                        style={{
                          borderRadius: S.radius.full,
                          height: moderateScale(10),
                          overflow: 'hidden',
                        }}
                      >
                        <View
                          className="bg-primary-500"
                          style={{
                            height: '100%',
                            width: `${item.percent}%`,
                          }}
                        />
                      </View>

                      <Text
                        className="text-text-muted"
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: S.fs.xs,
                        }}
                      >
                        {item.percent}% of recorded expenses across {item.transactionCount} entries
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

            </View>
          </ScrollView>
        </>
      ) : null}
    </SafeAreaView>
  );
}
