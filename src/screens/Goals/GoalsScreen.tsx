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
import {
  ArrowLeftIcon,
  BagIcon,
  BellIcon,
  CarIcon,
  Header,
  HomeIcon,
  IconButton,
  PlusIcon,
  StackCashIcon,
} from '../../components';
import GoalCard, {
  type GoalCardItem,
} from '../../components/features/Goals/GoalCard';
import { GoalFilterTabs } from '../../components/features/Goals/GoalFilterTabs';
import { GoalHeroCard } from '../../components/features/Goals/GoalHeroCard';
import {
  selectAllGoals,
  selectGoalSummary,
  selectHasHydrated,
  selectHasInitializedData,
  selectInitializeAppData,
  useAppStore,
} from '../../store';
import { colors, darkColors, lightColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import type { GoalModel, GoalStatus } from '../../types/models';
import { moderateScale } from '../../utils/responsive';

type GoalTab = GoalStatus;

const TABS: readonly GoalTab[] = ['Active', 'Planned', 'Completed'];

function mapGoalIcon(goal: GoalModel) {
  switch (goal.icon) {
    case 'car':
      return CarIcon;
    case 'home':
      return HomeIcon;
    case 'travel':
      return BagIcon;
    case 'savings':
    default:
      return StackCashIcon;
  }
}

function toGoalCardItem(goal: GoalModel): GoalCardItem {
  return {
    id: goal.id,
    title: goal.title,
    subtitle: goal.subtitle,
    savedAmount: goal.savedAmountLabel,
    targetAmount: goal.targetAmountLabel,
    leftAmount: goal.leftAmountLabel,
    dueLabel: goal.deadlineLabel,
    monthlyPlan: `${goal.monthlyTargetLabel} / month`,
    progress: goal.progress,
    tint: goal.accentColor,
    iconBg: goal.iconBackgroundColor,
    status: goal.status === 'Completed' ? 'Achieved' : goal.status,
    Icon: mapGoalIcon(goal),
  };
}

export function GoalsScreen() {
  const navigation = useNavigation<any>();
  const isDark = useColorScheme() === 'dark';
  const headerIconColor = isDark ? darkColors.title : lightColors.title;
  const statusBarBackgroundColor = isDark
    ? darkColors.background
    : lightColors.background;
  const hasHydrated = useAppStore(selectHasHydrated);
  const hasInitializedData = useAppStore(selectHasInitializedData);
  const initializeAppData = useAppStore(selectInitializeAppData);
  const goals = useAppStore(selectAllGoals);
  const goalSummary = useAppStore(selectGoalSummary);
  const [activeTab, setActiveTab] = useState<GoalTab>('Active');

  useEffect(() => {
    if (hasHydrated) {
      initializeAppData();
    }
  }, [hasHydrated, initializeAppData]);

  const filteredGoals = useMemo(
    () => goals.filter((goal) => goal.status === activeTab),
    [activeTab, goals],
  );
  const isBootstrapping = !hasHydrated || !hasInitializedData;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={statusBarBackgroundColor}
      />

      <Header
        variant="centerTitle"
        title="My Goals"
        titleClassName="text-title"
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
            <ArrowLeftIcon color={headerIconColor} size={moderateScale(24)} />
          </IconButton>
        }
        rightAction={
          <IconButton
            accessibilityLabel="Open notifications"
            className="items-center justify-center bg-pill"
            borderRadius={moderateScale(20)}
            onPress={() => navigation.navigate('Notification')}
            size={moderateScale(40)}
          >
            <BellIcon color={headerIconColor} size={moderateScale(18)} />
          </IconButton>
        }
      />

      {!isBootstrapping ? (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: S.space.paddingHorizontal,
              paddingVertical: S.space.md,
              gap: moderateScale(26),
            }}
          >
            <GoalHeroCard
              progress={goalSummary.completionPercent}
              savedAmount={goalSummary.totalSavedLabel}
              targetAmount={goalSummary.totalTargetLabel}
              activeGoals={goalSummary.activeCount}
              completedGoals={goalSummary.completedCount}
              monthlySaving={goalSummary.monthlyContributionLabel}
            />
          </View>

          <View
            className="bg-secondary-bg"
            style={{
              borderTopLeftRadius: moderateScale(72),
              borderTopRightRadius: moderateScale(72),
              gap: moderateScale(22),
              paddingHorizontal: S.space.paddingHorizontal,
              paddingTop: moderateScale(40),
              paddingBottom: S.space['4xl'],
              marginTop: moderateScale(14),
            }}
          >
            <View
              className="flex-row items-center justify-between"
              style={{ paddingBottom: moderateScale(4) }}
            >
              <Text
                className="text-title"
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: S.fs.lg,
                }}
              >
                Goal plans
              </Text>

              <TouchableOpacity
                accessibilityRole="button"
                activeOpacity={0.85}
                className="items-center justify-center bg-primary-500"
                onPress={() =>
                  navigation.navigate('GoalDetail', { startInEditMode: true })
                }
                style={{
                  borderRadius: S.radius.lg,
                  height: moderateScale(44),
                  width: moderateScale(44),
                }}
              >
                <PlusIcon color={colors.surfaceDark} size={22} />
              </TouchableOpacity>
            </View>

            <GoalFilterTabs
              tabs={TABS}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <View style={{ gap: moderateScale(16) }}>
              {filteredGoals.length > 0 ? (
                filteredGoals.map((goal: GoalModel) => (
                  <GoalCard
                    key={goal.id}
                    item={toGoalCardItem(goal)}
                    onPress={() =>
                      navigation.navigate('GoalDetail', { goalId: goal.id })
                    }
                  />
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
                    No {activeTab.toLowerCase()} goals yet
                  </Text>
                  <Text
                    className="text-text-muted"
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: S.fs.sm,
                    }}
                  >
                    Create a new savings goal to start tracking progress in this
                    tab.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}
