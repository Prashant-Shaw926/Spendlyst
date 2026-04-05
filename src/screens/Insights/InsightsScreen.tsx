import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  BellIcon,
  CalendarIcon,
  CheckSquareIcon,
  SearchIcon,
} from '../../components/shared/FinanceIcons';
import { IncomeExpenseBarChart } from '../../components/features/insights/IncomeExpenseBarChart';
import { InsightsSummaryStats } from '../../components/features/insights/InsightsSummaryStats';
import { TargetCard } from '../../components/features/insights/TargetCard';
import { BudgetOverview } from '../../components/shared/BudgetOverview';
import { ChartSection } from '../../components/shared/ChartSection';
import { Header } from '../../components/shared/Header';
import { IconButton } from '../../components/shared/IconButton';
import { InsightsScreenSkeleton } from '../../components/shared/InsightsScreenSkeleton';
import { ScreenState } from '../../components/shared/ScreenState';
import { SegmentedTabs } from '../../components/shared/SegmentedTabs';
import {
  selectFetchInsights,
  selectInsightsScreenState,
} from '../../store/selectors/insights.selectors';
import { useAppStore } from '../../store/useAppStore';
import { colors, getSemanticColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import type { InsightRange } from '../../types/api';
import type { InsightsStackParamList } from '../../types/navigation';
import { getInsightChartData } from '../../utils/finance';
import { moderateScale } from '../../utils/responsive';

export function InsightsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<InsightsStackParamList>>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState<InsightRange>('Daily');
  const { insightsData, insightsError, isInitialLoading, isRefreshing } =
    useAppStore(selectInsightsScreenState);
  const fetchInsights = useAppStore(selectFetchInsights);

  const semanticColors = getSemanticColors(isDark);
  const fallbackTabs: InsightRange[] = ['Daily', 'Weekly', 'Monthly', 'Year'];
  const tabs = insightsData?.tabs ?? fallbackTabs;
  const dayData = getInsightChartData(insightsData, activeTab);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  useEffect(() => {
    if (!insightsData) {
      return;
    }

    setActiveTab(current => {
      if (insightsData.tabs.includes(current)) {
        return current;
      }

      return insightsData.activeTab;
    });
  }, [insightsData]);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']} style={{}}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={semanticColors.background}
      />

      {isInitialLoading ? <InsightsScreenSkeleton /> : null}

      {!insightsData && insightsError ? (
        <ScreenState
          mode="error"
          title="Unable To Load Insights"
          message={insightsError}
          onRetry={() => {
            fetchInsights({ force: true });
          }}
        />
      ) : null}

      {insightsData ? (
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
                <BellIcon
                  color={semanticColors.title}
                  size={moderateScale(18)}
                />
              </IconButton>
            }
          />
          <ScrollView
            style={{ flex: 1 }}
            // contentContainerStyle={{ paddingBottom: S.space['4xl'] }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => {
                  fetchInsights({ force: true });
                }}
                colors={[colors.primary500]}
                tintColor={colors.primary500}
                progressBackgroundColor={
                  isDark ? colors.cardDark : colors.cardLight
                }
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
                <BudgetOverview
                  leftMetric={{
                    label: 'Total Balance',
                    value: insightsData.overview.totalBalanceLabel,
                    labelClassName: 'text-text',
                    valueClassName: 'text-text',
                    icon: (
                      <CheckSquareIcon color={semanticColors.text} size={13} />
                    ),
                  }}
                  rightMetric={{
                    label: 'Total Expense',
                    value: insightsData.overview.totalExpenseLabel,
                    labelClassName: 'text-text',
                    valueClassName: 'text-finance-expense',
                    icon: (
                      <CheckSquareIcon color={semanticColors.text} size={13} />
                    ),
                  }}
                  progressPercent={insightsData.overview.spentPercent}
                  progressValue={insightsData.overview.budgetLabel}
                  note={insightsData.overview.note}
                  noteClassName="text-text"
                  noteIconColor={semanticColors.text}
                  dividerClassName="bg-primary-50"
                />
              </View>
            </View>

            <View
              className="bg-card"
              style={{
                marginTop: moderateScale(20),
                borderTopLeftRadius: moderateScale(72),
                borderTopRightRadius: moderateScale(72),
                paddingTop: moderateScale(32),
                paddingHorizontal: moderateScale(36),
                paddingBottom: moderateScale(34),
              }}
            >
              <SegmentedTabs
                activeTab={activeTab}
                tabs={tabs}
                onChange={setActiveTab}
                containerClassName="flex-row items-center bg-secondary-card"
                activeItemClassName="bg-primary-500"
                activeLabelClassName="text-surface-dark"
                inactiveLabelClassName="text-text"
                containerPadding={5}
                gap={0}
                containerStyle={{
                  borderRadius: moderateScale(24),
                }}
                itemStyle={{
                  borderRadius: moderateScale(20),
                }}
                labelStyle={{
                  fontSize: moderateScale(14),
                }}
              />

              <ChartSection
                title={insightsData.chartTitle}
                titleClassName="text-surface-dark"
                titleStyle={{
                  fontSize: moderateScale(18),
                  fontFamily: 'Poppins-SemiBold',
                }}
                containerClassName="bg-primary-100"
                containerStyle={{
                  marginTop: moderateScale(30),
                  borderRadius: moderateScale(46),
                  paddingHorizontal: moderateScale(28),
                  paddingTop: moderateScale(18),
                  paddingBottom: moderateScale(22),
                }}
                headerStyle={{
                  marginBottom: moderateScale(14),
                }}
                actions={
                  <View className="flex-row" style={{ gap: S.space.sm }}>
                    <IconButton
                      accessibilityLabel="Search analytics"
                      className="items-center justify-center bg-primary-500"
                      borderRadius={moderateScale(17)}
                      size={moderateScale(34)}
                    >
                      <SearchIcon color={colors.surfaceDark} size={18} />
                    </IconButton>

                    <IconButton
                      accessibilityLabel="Open calendar"
                      className="items-center justify-center bg-primary-500"
                      borderRadius={moderateScale(17)}
                      size={moderateScale(34)}
                    >
                      <CalendarIcon color={colors.surfaceDark} size={18} />
                    </IconButton>
                  </View>
                }
              >
                {({ width }) =>
                  width > 0 ? (
                    <IncomeExpenseBarChart
                      width={width - moderateScale(56)}
                      height={moderateScale(162)}
                      data={dayData}
                    />
                  ) : null
                }
              </ChartSection>

              <InsightsSummaryStats summary={insightsData.summary} />

              <View style={{ marginTop: moderateScale(30) }}>
                <Text
                  className="text-text"
                  style={{
                    fontSize: S.fs.lg,
                    fontFamily: 'Poppins-SemiBold',
                    marginBottom: moderateScale(16),
                  }}
                >
                  My Targets
                </Text>

                <View style={{ flexDirection: 'row', gap: moderateScale(14) }}>
                  {insightsData.targets.map(target => (
                    <TargetCard key={target.id} target={target} />
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
