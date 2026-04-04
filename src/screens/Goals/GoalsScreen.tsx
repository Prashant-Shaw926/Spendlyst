import React, { useMemo, useState } from 'react';
import {
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
import { GoalCard, type GoalCardItem } from '../../components/Goals/GoalCard';
import { GoalFilterTabs } from '../../components/Goals/GoalFilterTabs';
import { GoalHeroCard } from '../../components/Goals/GoalHeroCard';
import {
  BagIcon,
  BellIcon,
  CarIcon,
  HomeIcon,
  PlusIcon,
  StackCashIcon,
} from '../../components/shared/FinanceIcons';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import type { GoalsStackParamList } from '../../types/navigation';
import { moderateScale } from '../../utils/responsive';

type GoalTab = 'Active' | 'Planned' | 'Completed';

const TABS: GoalTab[] = ['Active', 'Planned', 'Completed'];

type GoalStatus = GoalTab;

type ScreenGoal = GoalCardItem & {
  statusGroup: GoalStatus;
};

export function GoalsScreen() {
  const [activeTab, setActiveTab] = useState<GoalTab>('Active');
  const navigation = useNavigation<NativeStackNavigationProp<GoalsStackParamList>>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const goals = useMemo<ScreenGoal[]>(
    () => [
      {
        id: 'emergency-fund',
        title: 'Emergency Fund',
        subtitle: 'Peace-of-mind savings',
        savedAmount: '$8,400',
        targetAmount: '$12,000',
        leftAmount: '$3,600',
        dueLabel: 'Nov 2026',
        monthlyPlan: '$450 / month',
        progress: 70,
        tint: colors.primary500,
        iconBg: isDark ? 'rgba(0,208,158,0.18)' : colors.primary100,
        status: 'On Track',
        statusGroup: 'Active',
        Icon: StackCashIcon,
      },
      {
        id: 'dream-car',
        title: 'Dream Car',
        subtitle: 'Upgrade your ride',
        savedAmount: '$5,600',
        targetAmount: '$10,000',
        leftAmount: '$4,400',
        dueLabel: 'Jun 2027',
        monthlyPlan: '$600 / month',
        progress: 56,
        tint: colors.blue700,
        iconBg: isDark ? 'rgba(50,153,255,0.18)' : '#E8F2FF',
        status: 'Building',
        statusGroup: 'Active',
        Icon: CarIcon,
      },
      {
        id: 'home-deposit',
        title: 'Home Deposit',
        subtitle: 'Down payment plan',
        savedAmount: '$18,500',
        targetAmount: '$40,000',
        leftAmount: '$21,500',
        dueLabel: 'Dec 2027',
        monthlyPlan: '$1,200 / month',
        progress: 46,
        tint: colors.surfaceDark,
        iconBg: isDark ? 'rgba(255,255,255,0.08)' : colors.primary100,
        status: 'Planning',
        statusGroup: 'Planned',
        Icon: HomeIcon,
      },
      {
        id: 'summer-trip',
        title: 'Summer Trip',
        subtitle: 'Portugal getaway',
        savedAmount: '$2,400',
        targetAmount: '$2,400',
        leftAmount: '$0',
        dueLabel: 'Completed',
        monthlyPlan: 'Finished in Apr 2026',
        progress: 100,
        tint: colors.primary500,
        iconBg: isDark ? 'rgba(0,208,158,0.18)' : colors.primary100,
        status: 'Achieved',
        statusGroup: 'Completed',
        Icon: BagIcon,
      },
    ],
    [isDark],
  );

  const filteredGoals = useMemo(
    () => goals.filter((goal) => goal.statusGroup === activeTab),
    [activeTab, goals],
  );

  const activeGoalsCount = useMemo(
    () => goals.filter((goal) => goal.statusGroup === 'Active').length,
    [goals],
  );

  const completedGoalsCount = useMemo(
    () => goals.filter((goal) => goal.statusGroup === 'Completed').length,
    [goals],
  );

  const screenBg = isDark ? colors.surfaceDeep : colors.primary500;
  const sheetBg = isDark ? colors.surfaceDark : colors.primary50;
  const titleColor = isDark ? colors.card : colors.surfaceDark;
  const subtitleColor = isDark ? 'rgba(255,255,255,0.78)' : colors.surfaceDark;
  const bellBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(241,255,243,0.95)';
  const bellBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(5,34,36,0.08)';
  const newGoalBg = isDark ? colors.primary500 : colors.surfaceDark;
  const newGoalText = isDark ? colors.surfaceDark : colors.card;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: screenBg }} edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={screenBg}
      />

      <ScrollView
        style={{ flex: 1 }}
        // contentContainerStyle={{ paddingBottom: S.space['4xl'] }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: moderateScale(36),
            paddingTop: S.space.lg,
            paddingBottom: moderateScale(22),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flex: 1, paddingRight: S.space.lg }}>
              <Text
                style={{
                  fontSize: moderateScale(24),
                  fontFamily: 'Poppins-Bold',
                  color: titleColor,
                  letterSpacing: -0.5,
                }}
              >
                My Goals
              </Text>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: S.fs.sm,
                  fontFamily: 'Poppins-Regular',
                  color: subtitleColor,
                }}
              >
                Track the things you are saving for.
              </Text>
            </View>

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
            <GoalHeroCard
              isDark={isDark}
              progress={61}
              savedAmount="$34,900"
              targetAmount="$64,400"
              activeGoals={activeGoalsCount}
              completedGoals={completedGoalsCount}
              monthlySaving="$2,250"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: moderateScale(8),
            borderTopLeftRadius: moderateScale(72),
            borderTopRightRadius: moderateScale(72),
            backgroundColor: sheetBg,
            paddingTop: moderateScale(30),
            paddingHorizontal: moderateScale(36),
            paddingBottom: moderateScale(34),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: moderateScale(18),
            }}
          >
            <Text
              style={{
                fontSize: S.fs.lg,
                fontFamily: 'Poppins-SemiBold',
                color: isDark ? colors.card : colors.surfaceDark,
              }}
            >
              Goal Plans
            </Text>

            <TouchableOpacity
              accessibilityRole="button"
              style={{
                borderRadius: moderateScale(18),
                backgroundColor: newGoalBg,
                paddingVertical: moderateScale(10),
                paddingHorizontal: moderateScale(14),
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <PlusIcon color={newGoalText} size={16} />
              <Text
                style={{
                  marginLeft: 6,
                  fontSize: S.fs.sm,
                  fontFamily: 'Poppins-Medium',
                  color: newGoalText,
                }}
              >
                New Goal
              </Text>
            </TouchableOpacity>
          </View>

          <GoalFilterTabs
            tabs={TABS}
            activeTab={activeTab}
            isDark={isDark}
            onChange={setActiveTab}
          />

          <View style={{ marginTop: moderateScale(22), gap: moderateScale(16) }}>
            {filteredGoals.map((goal) => (
              <GoalCard key={goal.id} item={goal} isDark={isDark} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
