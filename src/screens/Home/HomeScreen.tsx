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
import { HomeBalanceSection } from '../../components/features/home/HomeBalanceSection';
import { HomeSavingsCard } from '../../components/features/home/HomeSavingsCard';
import { HomeTransactionItem } from '../../components/features/home/HomeTransactionItem';
import { BellIcon } from '../../components/shared/FinanceIcons';
import { Header } from '../../components/shared/Header';
import { HomeScreenSkeleton } from '../../components/shared/HomeScreenSkeleton';
import { IconButton } from '../../components/shared/IconButton';
import { ScreenState } from '../../components/shared/ScreenState';
import { SegmentedTabs } from '../../components/shared/SegmentedTabs';
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
  const headerTextColor = isDark ? colors.card : colors.surfaceDark;
  const { homeData, homeError, isInitialLoading, isRefreshing } = useAppStore(
    selectHomeScreenState,
  );
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

      {isInitialLoading ? <HomeScreenSkeleton isDark={isDark} /> : null}

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
            // paddingBottom: moderateScale(150),
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
              variant="home"
              title={homeData.headerTitle}
              subtitle={homeData.greeting}
              titleColor={headerTextColor}
              subtitleColor={headerTextColor}
              rightAction={
                <IconButton
                  accessibilityLabel="Open notifications"
                  backgroundColor={colors.primary50}
                  borderRadius={moderateScale(21)}
                  onPress={() => navigation.navigate('Notification')}
                  size={moderateScale(42)}
                >
                  <BellIcon
                    color={colors.surfaceDark}
                    size={moderateScale(22)}
                  />
                </IconButton>
              }
            />

            <HomeBalanceSection isDark={isDark} overview={homeData.overview} />
          </View>

          <View
            className="bg-card rounded-t-[56px]"
            style={{
              paddingHorizontal: moderateScale(36),
              paddingVertical: moderateScale(36),
              gap: moderateScale(28),
            }}
          >
            <HomeSavingsCard weekly={homeData.weekly} />

            <SegmentedTabs
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={TABS}
              activeBackgroundColor={colors.primary500}
              activeTextColor={colors.surfaceDark}
              inactiveTextColor={headerTextColor}
              containerStyle={{
                backgroundColor: isDark
                  ? colors.surfaceRaised
                  : colors.primary100,
                borderRadius: moderateScale(24),
              }}
              itemStyle={{
                borderRadius: moderateScale(20),
              }}
            />

            <View style={{ gap: moderateScale(24) }}>
              {transactions.map(item => (
                <HomeTransactionItem
                  key={item.id}
                  item={item}
                  isDark={isDark}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}
