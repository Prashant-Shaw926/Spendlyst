import React, { useEffect, useState } from 'react';
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
import { BalanceSection } from '../../components/Home/BalanceSection';
import { Header } from '../../components/Home/Header';
import { SavingsCard } from '../../components/Home/SavingsCard';
import { Tabs } from '../../components/Home/Tabs';
import { TransactionItem } from '../../components/Home/TransactionItem';
import { HomeScreenSkeleton } from '../../components/shared/HomeScreenSkeleton';
import { ScreenState } from '../../components/shared/ScreenState';
import {
  selectFetchHome,
  selectHomePreviewTransactions,
  selectHomeScreenState,
} from '../../store/selectors/home.selectors';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../theme/colors';
import type { HomeStackParamList } from '../../types/navigation';
import { moderateScale } from '../../utils/responsive';

type TabKey = 'Daily' | 'Weekly' | 'Monthly';

const TABS: readonly TabKey[] = ['Daily', 'Weekly', 'Monthly'];

export function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('Monthly');
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { homeData, homeError, isInitialLoading, isRefreshing } =
    useAppStore(selectHomeScreenState);
  const transactions = useAppStore(selectHomePreviewTransactions);
  const fetchHome = useAppStore(selectFetchHome);

  useEffect(() => {
    fetchHome();
  }, [fetchHome]);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        backgroundColor={isDark ? colors.surfaceDeep : colors.primary500}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      {isInitialLoading ? (
        <HomeScreenSkeleton isDark={isDark} />
      ) : null}

      {!homeData && homeError ? (
        <ScreenState
          isDark={isDark}
          mode="error"
          title="Unable To Load Home"
          message={homeError}
          onRetry={() => {
            fetchHome({ force: true });
          }}
        />
      ) : null}

      {homeData ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingBottom: moderateScale(150),
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                fetchHome({ force: true });
              }}
              colors={[colors.primary500]}
              tintColor={colors.primary500}
              progressBackgroundColor={colors.card}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <View style={{ gap: moderateScale(18) }}>
            <Header
              iconColor={colors.surfaceDark}
              onNotificationPress={() => navigation.navigate('Notification')}
              subtitle={homeData.greeting}
              title={homeData.headerTitle}
            />

            <BalanceSection
              iconColor={isDark ? colors.card : colors.surfaceDark}
              totalBalance={homeData.overview.totalBalanceLabel}
              totalExpense={homeData.overview.totalExpenseLabel}
              progressPercent={homeData.overview.spentPercent}
              progressValue={homeData.overview.budgetLabel}
              note={homeData.overview.note}
            />
          </View>

          <View
            className="bg-card rounded-t-[56px]"
            style={{
              paddingHorizontal: moderateScale(36),
              paddingVertical: moderateScale(36),
              gap: moderateScale(28),
            }}
          >
            <SavingsCard
              revenueValue={homeData.weekly.revenueLabel}
              foodValue={homeData.weekly.foodLabel}
            />

            <Tabs
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={TABS}
            />

            <View style={{ gap: moderateScale(24) }}>
              {transactions.map((item) => (
                <TransactionItem key={item.id} item={item} />
              ))}
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

