import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GroceriesIcon,
  RentIcon,
  SalaryIcon,
} from '../../assets/icons';
import { BalanceSection } from '../../components/Home/BalanceSection';
import { Header } from '../../components/Home/Header';
import { SavingsCard } from '../../components/Home/SavingsCard';
import { Tabs } from '../../components/Home/Tabs';
import {
  TransactionItem,
  type HomeTransaction,
} from '../../components/Home/TransactionItem';
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

  const transactions = useMemo<HomeTransaction[]>(
    () => [
      {
        id: 'salary',
        title: 'Salary',
        time: '18:27 - April 30',
        category: 'Monthly',
        amount: '$4.000,00',
        iconBackgroundClassName: 'bg-blue-300',
        Icon: SalaryIcon,
      },
      {
        id: 'groceries',
        title: 'Groceries',
        time: '17:00 - April 24',
        category: 'Pantry',
        amount: '-$100,00',
        isExpense: true,
        iconBackgroundClassName: 'bg-blue-500',
        Icon: GroceriesIcon,
      },
      {
        id: 'rent',
        title: 'Rent',
        time: '8:30 - April 15',
        category: 'Rent',
        amount: '-$674,40',
        isExpense: true,
        iconBackgroundClassName: 'bg-blue-700',
        Icon: RentIcon,
      },
    ],
    [],
  );

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        backgroundColor={isDark ? colors.surfaceDeep : colors.primary500}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: moderateScale(150),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: moderateScale(18) }}>
          <Header
            iconColor={colors.surfaceDark}
            onNotificationPress={() => navigation.navigate('Notification')}
            subtitle="Good Morning"
            title="Hi, Welcome Back"
          />

          <BalanceSection
            iconColor={isDark ? colors.card : colors.surfaceDark}
            progressPercent={30}
            progressValue="$20,000.00"
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
          <SavingsCard />

          <Tabs
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={TABS}
          />

          <View style={{ gap: moderateScale(24) }}>
            {transactions.map(item => (
              <TransactionItem key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
