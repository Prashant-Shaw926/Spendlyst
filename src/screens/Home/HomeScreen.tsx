import React, { useEffect } from 'react';
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
import { HomeTransactionItem } from '../../components/features/home/HomeTransactionItem';
import { IncomeExpenseBarChart } from '../../components/features/insights/IncomeExpenseBarChart';
import { BellIcon } from '../../components/shared/Icons';
import { Header } from '../../components/shared/Header';
import { HomeScreenSkeleton } from '../../components/shared/HomeScreenSkeleton';
import { IconButton } from '../../components/shared/IconButton';
import { ChartSection } from '../../components/shared/ChartSection';
import {
  selectHasHydrated,
  selectHasInitializedData,
  selectInitializeAppData,
} from '../../store/selectors/app.selectors';
import { selectHomeDashboard } from '../../store/selectors/home.selectors';
import { useAppStore } from '../../store/useAppStore';
import { colors, darkColors, lightColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <View
      className="bg-secondary-card"
      style={{
        borderRadius: S.radius.xxl,
        flex: 1,
        gap: S.space.xs,
        paddingHorizontal: S.space.md,
        paddingVertical: S.space.md,
      }}
    >
      <Text
        className="text-text-muted"
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: S.fs.xs,
        }}
      >
        {label}
      </Text>
      <Text
        className="text-text"
        style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: S.fs.md,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const isDark = useColorScheme() === 'dark';
  const headerActionIconColor = isDark ? darkColors.title : lightColors.title;
  const hasHydrated = useAppStore(selectHasHydrated);
  const hasInitializedData = useAppStore(selectHasInitializedData);
  const initializeAppData = useAppStore(selectInitializeAppData);
  const dashboard = useAppStore(selectHomeDashboard);

  useEffect(() => {
    if (hasHydrated) {
      initializeAppData();
    }
  }, [hasHydrated, initializeAppData]);

  const isBootstrapping = !hasHydrated || !hasInitializedData;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        backgroundColor={isDark ? colors.surfaceDeep : colors.primary500}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      {isBootstrapping ? <HomeScreenSkeleton /> : null}

      {!isBootstrapping ? (
        <>
          <Header
            variant="home"
            title={dashboard.headerTitle}
            subtitle={dashboard.greeting}
            titleClassName="text-text"
            subtitleClassName="text-text"
            rightAction={
              <IconButton
                accessibilityLabel="Open notifications"
                className="items-center justify-center bg-pill"
                borderRadius={moderateScale(21)}
                onPress={() => navigation.navigate('Notification')}
                size={moderateScale(40)}
              >
                <BellIcon
                  color={headerActionIconColor}
                  size={moderateScale(18)}
                />
              </IconButton>
            }
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                gap: S.space.xl,
                paddingHorizontal: S.space.paddingHorizontal,
                paddingVertical: S.space.md,
              }}
            >
              <View
                className="bg-card"
                style={{
                  borderRadius: S.radius.xxxl,
                  gap: S.space.lg,
                  paddingHorizontal: S.space.lg,
                  paddingVertical: S.space.xl,
                }}
              >
                <View style={{ gap: S.space.xs }}>
                  <Text
                    className="text-text-muted"
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: S.fs.sm,
                    }}
                  >
                    Current balance
                  </Text>
                  <Text
                    className="text-text"
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: S.fs.xl,
                    }}
                  >
                    {dashboard.overview.totalBalanceLabel}
                  </Text>
                  <Text
                    className="text-text-muted"
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: S.fs.xs,
                    }}
                  >
                    {dashboard.overview.note}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', gap: S.space.md }}>
                  <MetricTile
                    label="Total income"
                    value={dashboard.overview.totalIncomeLabel}
                  />
                  <MetricTile
                    label="Total expenses"
                    value={dashboard.overview.totalExpenseLabel}
                  />
                </View>
              </View>
            </View>

            <View
              className="bg-card"
              style={{
                borderTopLeftRadius: moderateScale(56),
                borderTopRightRadius: moderateScale(56),
                gap: S.space.xl,
                marginTop: S.space.md,
                paddingHorizontal: S.space.paddingHorizontal,
                paddingTop: S.space['2xl'],
                paddingBottom: S.space['4xl'],
              }}
            >
              <ChartSection
                title="Weekly money flow"
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
                      data={dashboard.weeklyTrend}
                    />
                  ) : null
                }
              </ChartSection>

              <View style={{ gap: S.space.lg }}>
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
                      fontSize: S.fs.md_h,
                    }}
                  >
                    Recent activity
                  </Text>

                  <TouchableOpacity
                    accessibilityRole="button"
                    onPress={() =>
                      navigation.getParent()?.navigate('TransactionsTab', {
                        screen: 'Transactions',
                      })
                    }
                  >
                    <Text
                      className="text-blue-700"
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        fontSize: S.fs.sm,
                      }}
                    >
                      View all
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ gap: S.space.lg }}>
                  {dashboard.recentTransactions.map(transaction => (
                    <HomeTransactionItem
                      key={transaction.id}
                      item={transaction}
                      onPress={() =>
                        navigation.getParent()?.navigate('TransactionsTab', {
                          screen: 'TransactionDetail',
                          params: { transactionId: transaction.id },
                        })
                      }
                    />
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
