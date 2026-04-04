import React, { useCallback, useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  type LayoutChangeEvent,
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
import { IncomeExpenseBarChart } from '../../components/Insights/IncomeExpenseBarChart';
import { StatsCard } from '../../components/Insights/StatsCard';
import { TargetCard } from '../../components/Insights/TargetCard';
import { InsightsScreenSkeleton } from '../../components/shared/InsightsScreenSkeleton';
import { ScreenState } from '../../components/shared/ScreenState';
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

function MetricBlock({
  label,
  value,
  labelColor,
  valueColor,
}: {
  label: string;
  value: string;
  labelColor: string;
  valueColor: string;
}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <CheckSquareIcon color={labelColor} size={13} />
        <Text
          style={{
            marginLeft: 6,
            fontSize: S.fs.sm,
            fontFamily: 'Poppins-Regular',
            color: labelColor,
          }}
        >
          {label}
        </Text>
      </View>

      <Text
        style={{
          fontSize: moderateScale(22),
          fontFamily: 'Poppins-Bold',
          color: valueColor,
          letterSpacing: -0.4,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function InsightsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<InsightsStackParamList>>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState<InsightRange>('Daily');
  const [chartWidth, setChartWidth] = useState(0);
  const { insightsData, insightsError, isInitialLoading, isRefreshing } =
    useAppStore(selectInsightsScreenState);
  const fetchInsights = useAppStore(selectFetchInsights);

  const onChartLayout = useCallback((event: LayoutChangeEvent) => {
    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    setChartWidth((current) => (current === nextWidth ? current : nextWidth));
  }, []);

  const headerTextColor = isDark ? colors.card : colors.surfaceDark;
  const screenBg = isDark ? colors.surfaceDeep : colors.primary500;
  const sheetBg = isDark ? colors.surfaceDark : colors.card;
  const segmentBg = isDark ? colors.surfaceMedium : colors.primary100;
  const titleColor = isDark ? colors.card : colors.surfaceDark;
  const labelColor = isDark ? 'rgba(255,255,255,0.8)' : colors.surfaceDark;
  const noteColor = isDark ? colors.card : colors.surfaceDark;
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
    <SafeAreaView style={{ flex: 1, backgroundColor: screenBg }}>
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
          contentContainerStyle={{ paddingBottom: S.space['4xl'] }}
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
                Analysis
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

            <View style={{ flexDirection: 'row', marginTop: moderateScale(34) }}>
              <MetricBlock
                label="Total Balance"
                value={insightsData.overview.totalBalanceLabel}
                labelColor={labelColor}
                valueColor={colors.card}
              />

              <View
                style={{
                  width: 1,
                  marginHorizontal: moderateScale(18),
                  backgroundColor: isDark ? 'rgba(255,255,255,0.34)' : 'rgba(255,255,255,0.84)',
                }}
              />

              <MetricBlock
                label="Total Expense"
                value={insightsData.overview.totalExpenseLabel}
                labelColor={labelColor}
                valueColor={colors.blue700}
              />
            </View>

            <View style={{ marginTop: moderateScale(18) }}>
              <View
                style={{
                  height: moderateScale(28),
                  borderRadius: moderateScale(16),
                  backgroundColor: colors.primary50,
                  overflow: 'hidden',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: `${Math.max(0, Math.min(insightsData.overview.spentPercent, 100))}%`,
                    borderRadius: moderateScale(16),
                    backgroundColor: colors.surfaceDark,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: moderateScale(20),
                  }}
                >
                  <Text
                    style={{
                      fontSize: S.fs.xs,
                      fontFamily: 'Poppins-Medium',
                      color: colors.card,
                    }}
                  >
                    {insightsData.overview.spentPercent}%
                  </Text>
                  <Text
                    style={{
                      fontSize: S.fs.sm,
                      fontFamily: 'Poppins-SemiBold',
                      color: colors.surfaceDark,
                      fontStyle: 'italic',
                    }}
                  >
                    {insightsData.overview.budgetLabel}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
                <CheckSquareIcon color={labelColor} size={15} />
                <Text
                  style={{
                    marginLeft: 9,
                    fontSize: S.fs.md,
                    fontFamily: 'Poppins-Regular',
                    color: noteColor,
                  }}
                >
                  {insightsData.overview.note}
                </Text>
              </View>
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
            <View
              style={{
                borderRadius: moderateScale(24),
                backgroundColor: segmentBg,
                padding: 5,
                flexDirection: 'row',
              }}
            >
              {tabs.map((tab) => {
                const isActive = tab === activeTab;

                return (
                  <TouchableOpacity
                    key={tab}
                    accessibilityRole="button"
                    onPress={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      borderRadius: moderateScale(20),
                      backgroundColor: isActive ? colors.primary500 : 'transparent',
                      paddingVertical: moderateScale(12),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(14),
                        fontFamily: isActive ? 'Poppins-Medium' : 'Poppins-Regular',
                        color: isActive ? colors.surfaceDark : titleColor,
                      }}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View
              onLayout={onChartLayout}
              style={{
                marginTop: moderateScale(30),
                borderRadius: moderateScale(46),
                backgroundColor: colors.primary100,
                paddingHorizontal: moderateScale(28),
                paddingTop: moderateScale(18),
                paddingBottom: moderateScale(22),
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: moderateScale(14),
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(18),
                    fontFamily: 'Poppins-SemiBold',
                    color: colors.surfaceDark,
                  }}
                >
                  {insightsData.chartTitle}
                </Text>

                <View style={{ flexDirection: 'row', gap: moderateScale(8) }}>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Search analytics"
                    style={{
                      width: moderateScale(34),
                      height: moderateScale(34),
                      borderRadius: moderateScale(17),
                      backgroundColor: colors.primary500,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <SearchIcon color={colors.surfaceDark} size={18} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Open calendar"
                    style={{
                      width: moderateScale(34),
                      height: moderateScale(34),
                      borderRadius: moderateScale(17),
                      backgroundColor: colors.primary500,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CalendarIcon color={colors.surfaceDark} size={18} />
                  </TouchableOpacity>
                </View>
              </View>

              {chartWidth > 0 ? (
                <IncomeExpenseBarChart
                  width={chartWidth - moderateScale(56)}
                  height={moderateScale(162)}
                  data={dayData}
                />
              ) : null}
            </View>

            <StatsCard
              isDark={isDark}
              incomeValue={insightsData.summary.incomeLabel}
              expenseValue={insightsData.summary.expenseLabel}
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

