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
import { colors } from '../../theme/colors';
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

  const headerTextColor = isDark ? colors.card : colors.surfaceDark;
  const screenBg = isDark ? colors.surfaceDeep : colors.primary500;
  const sheetBg = isDark ? colors.surfaceDark : colors.card;
  const segmentBg = isDark ? colors.surfaceMedium : colors.primary100;
  const titleColor = isDark ? colors.card : colors.surfaceDark;
  const labelColor = isDark ? 'rgba(255,255,255,0.8)' : colors.surfaceDark;
  const noteColor = isDark ? colors.card : colors.surfaceDark;
  const dividerColor = isDark
    ? 'rgba(255,255,255,0.34)'
    : 'rgba(255,255,255,0.84)';
  const bellBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(241,255,243,0.95)';
  const bellBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(5,34,36,0.08)';
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

    setActiveTab((current) => {
      if (insightsData.tabs.includes(current)) {
        return current;
      }

      return insightsData.activeTab;
    });
  }, [insightsData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: screenBg }} edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={screenBg}
      />

      {isInitialLoading ? (
        <InsightsScreenSkeleton isDark={isDark} />
      ) : null}

      {!insightsData && insightsError ? (
        <ScreenState
          isDark={isDark}
          mode="error"
          title="Unable To Load Insights"
          message={insightsError}
          onRetry={() => {
            fetchInsights({ force: true });
          }}
        />
      ) : null}

      {insightsData ? (
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
              title="Analysis"
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

            <View style={{ marginTop: moderateScale(34) }}>
              <BudgetOverview
                leftMetric={{
                  label: 'Total Balance',
                  value: insightsData.overview.totalBalanceLabel,
                  labelColor,
                  valueColor: colors.card,
                  icon: <CheckSquareIcon color={labelColor} size={13} />,
                }}
                rightMetric={{
                  label: 'Total Expense',
                  value: insightsData.overview.totalExpenseLabel,
                  labelColor,
                  valueColor: colors.blue700,
                  icon: <CheckSquareIcon color={labelColor} size={13} />,
                }}
                progressPercent={insightsData.overview.spentPercent}
                progressValue={insightsData.overview.budgetLabel}
                note={insightsData.overview.note}
                noteColor={noteColor}
                noteIconColor={labelColor}
                dividerStyle={{
                  marginHorizontal: moderateScale(18),
                  backgroundColor: dividerColor,
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: moderateScale(20),
              borderTopLeftRadius: moderateScale(72),
              borderTopRightRadius: moderateScale(72),
              backgroundColor: sheetBg,
              paddingTop: moderateScale(32),
              paddingHorizontal: moderateScale(36),
              paddingBottom: moderateScale(34),
            }}
          >
            <SegmentedTabs
              activeTab={activeTab}
              tabs={tabs}
              onChange={setActiveTab}
              activeBackgroundColor={colors.primary500}
              activeTextColor={colors.surfaceDark}
              inactiveTextColor={titleColor}
              containerPadding={5}
              gap={0}
              containerStyle={{
                borderRadius: moderateScale(24),
                backgroundColor: segmentBg,
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
              titleStyle={{
                fontSize: moderateScale(18),
                fontFamily: 'Poppins-SemiBold',
                color: colors.surfaceDark,
              }}
              containerStyle={{
                marginTop: moderateScale(30),
                borderRadius: moderateScale(46),
                backgroundColor: colors.primary100,
                paddingHorizontal: moderateScale(28),
                paddingTop: moderateScale(18),
                paddingBottom: moderateScale(22),
              }}
              headerStyle={{
                marginBottom: moderateScale(14),
              }}
              actions={
                <View style={{ flexDirection: 'row', gap: moderateScale(8) }}>
                  <IconButton
                    accessibilityLabel="Search analytics"
                    backgroundColor={colors.primary500}
                    borderRadius={moderateScale(17)}
                    size={moderateScale(34)}
                  >
                    <SearchIcon color={colors.surfaceDark} size={18} />
                  </IconButton>

                  <IconButton
                    accessibilityLabel="Open calendar"
                    backgroundColor={colors.primary500}
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

            <InsightsSummaryStats
              isDark={isDark}
              summary={insightsData.summary}
            />

            <View style={{ marginTop: moderateScale(30) }}>
              <Text
                style={{
                  fontSize: S.fs.lg,
                  fontFamily: 'Poppins-SemiBold',
                  color: titleColor,
                  marginBottom: moderateScale(16),
                }}
              >
                My Targets
              </Text>

              <View style={{ flexDirection: 'row', gap: moderateScale(14) }}>
                {insightsData.targets.map((target) => (
                  <TargetCard
                    key={target.id}
                    isDark={isDark}
                    target={target}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}
