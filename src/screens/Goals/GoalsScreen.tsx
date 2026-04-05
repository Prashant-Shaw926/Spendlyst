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
  ArrowLeftIcon,
  BagIcon,
  BellIcon,
  CarIcon,
  HomeIcon,
  PlusIcon,
  StackCashIcon,
} from '../../components/shared/FinanceIcons';
import { Header } from '../../components/shared/Header';
import { IconButton } from '../../components/shared/IconButton';
import { colors, getSemanticColors } from '../../theme/colors';
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
  const navigation =
    useNavigation<NativeStackNavigationProp<GoalsStackParamList>>();
  const isDark = useColorScheme() === 'dark';
  const semanticColors = getSemanticColors(isDark);

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

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={semanticColors.background}
      />

                  <Header
              variant="centerTitle"
              title="My Goals"
              titleClassName="text-text"
              contentStyle={{ paddingHorizontal: 0, paddingVertical: 0,}}
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
        className="flex-1"
        contentContainerStyle={{
          gap: moderateScale(30),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: S.space.paddingHorizontal,
            paddingVertical: S.space.md,
            gap: moderateScale(26),
          }}
        >


          <GoalHeroCard
            progress={61}
            savedAmount="$34,900"
            targetAmount="$64,400"
            activeGoals={activeGoalsCount}
            completedGoals={completedGoalsCount}
            monthlySaving="$2,250"
          />
        </View>

        <View
          className="bg-secondary-bg"
          style={{
            borderTopLeftRadius: moderateScale(72),
            borderTopRightRadius: moderateScale(72),
            paddingHorizontal: S.space.paddingHorizontal,
            paddingVertical: S.space['4xl'],
            gap: moderateScale(22),
          }}
        >
          <View className="flex-row items-center justify-between">
            <Text
              className="text-title"
              style={{
                fontSize: S.fs.lg,
                fontFamily: 'Poppins-SemiBold',
              }}
            >
              Goal Plans
            </Text>

            <TouchableOpacity
              accessibilityRole="button"
              className="flex-row items-center bg-primary-500"
              style={{
                borderRadius: moderateScale(18),
                paddingHorizontal: moderateScale(14),
                paddingVertical: moderateScale(10),
                gap: moderateScale(6),
              }}
            >
              <PlusIcon
                color={colors.black}
                size={16}
              />
              <Text
                className="text-black"
                style={{
                  fontSize: S.fs.sm,
                }}
              >
                New Goal
              </Text>
            </TouchableOpacity>
          </View>

          <GoalFilterTabs
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <View style={{ gap: moderateScale(16) }}>
            {filteredGoals.map((goal) => (
              <GoalCard key={goal.id} item={goal} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
