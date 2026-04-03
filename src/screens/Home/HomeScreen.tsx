import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SvgProps } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CarIcon,
  CheckIcon,
  ExpenseIcon,
  FoodIcon,
  GroceriesIcon,
  IncomeIcon,
  NotificationIcon,
  RentIcon,
  SalaryIcon,
} from '../../assets/icons';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';
import type { HomeStackParamList } from '../../types/navigation';

type TabKey = 'Daily' | 'Weekly' | 'Monthly';
type SvgIconComponent = React.ComponentType<SvgProps>;

type HomeTransaction = {
  id: string;
  title: string;
  time: string;
  category: string;
  amount: string;
  isExpense?: boolean;
  iconBg: string;
  Icon: SvgIconComponent;
};

const TABS: TabKey[] = ['Daily', 'Weekly', 'Monthly'];

// ─── MetricBlock ────────────────────────────────────────────────────────────

function MetricBlock({
  Icon,
  label,
  value,
  isNegative,
}: {
  Icon: SvgIconComponent;
  label: string;
  value: string;
  isNegative?: boolean;
}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Icon width={13} height={13} color={colors.surfaceDark} />
        <Text
          className="text-text font-poppins"
          style={{
            marginLeft: 6,
            fontSize: S.fs.sm,
            fontFamily: 'Poppins-Regular',
          }}
        >
          {label}
        </Text>
      </View>

      <Text
        className={isNegative ? 'text-finance-expense font-poppins' : 'text-text font-poppins'}
        style={{
          fontSize: moderateScale(22),
          fontFamily: 'Poppins-Bold',
          letterSpacing: -0.5,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

// ─── TransactionRow ──────────────────────────────────────────────────────────

function TransactionRow({ item }: { item: HomeTransaction }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: S.space.xl,
      }}
    >
      <View
        style={{
          width: moderateScale(56),
          height: moderateScale(56),
          borderRadius: moderateScale(18),
          backgroundColor: item.iconBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <item.Icon width={24} height={24} color={colors.card} />
      </View>

      <View style={{ flex: 1, marginLeft: S.space.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Title + time */}
          <View style={{ flex: 1.4, paddingRight: S.space.md }}>
            <Text
              className="text-text font-poppins"
              style={{
                fontSize: S.fs.md,
                fontFamily: 'Poppins-SemiBold',
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              className="text-finance-expense font-poppins"
              style={{
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-SemiBold',
                marginTop: 4,
              }}
              numberOfLines={1}
            >
              {item.time}
            </Text>
          </View>

          {/* Separator */}
          <View
            className="bg-primary-500"
            style={{
              width: 1,
              alignSelf: 'stretch',
              opacity: 0.7,
            }}
          />

          {/* Category */}
          <View style={{ flex: 1, paddingHorizontal: S.space.md }}>
            <Text
              className="text-text-muted font-poppins"
              style={{
                fontSize: S.fs.sm,
                fontFamily: 'Poppins-Regular',
              }}
              numberOfLines={1}
            >
              {item.category}
            </Text>
          </View>

          {/* Separator */}
          <View
            className="bg-primary-500"
            style={{
              width: 1,
              alignSelf: 'stretch',
              opacity: 0.7,
            }}
          />

          {/* Amount */}
          <View style={{ minWidth: moderateScale(88), paddingLeft: S.space.md }}>
            <Text
              className={item.isExpense ? 'text-finance-expense font-poppins' : 'text-text font-poppins'}
              style={{
                fontSize: S.fs.md,
                fontFamily: 'Poppins-SemiBold',
                textAlign: 'right',
              }}
              numberOfLines={1}
            >
              {item.amount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── HomeScreen ──────────────────────────────────────────────────────────────

export function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('Monthly');
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const transactions = useMemo<HomeTransaction[]>(
    () => [
      {
        id: 'salary',
        title: 'Salary',
        time: '18:27 - April 30',
        category: 'Monthly',
        amount: '$4.000,00',
        iconBg: colors.blue300,
        Icon: SalaryIcon,
      },
      {
        id: 'groceries',
        title: 'Groceries',
        time: '17:00 - April 24',
        category: 'Pantry',
        amount: '-$100,00',
        isExpense: true,
        iconBg: colors.blue500,
        Icon: GroceriesIcon,
      },
      {
        id: 'rent',
        title: 'Rent',
        time: '8:30 - April 15',
        category: 'Rent',
        amount: '-$674,40',
        isExpense: true,
        iconBg: colors.blue700,
        Icon: RentIcon,
      },
    ],
    [],
  );

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <StatusBar barStyle="dark-content" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: S.space['4xl'] }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header (green / dark-teal in dark mode via bg-bg) ── */}
        <View
          className="bg-"
          style={{
            paddingHorizontal: moderateScale(36),
            paddingTop: S.space.lg,
            paddingBottom: moderateScale(22),
          }}
        >
          {/* Title row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text
                className="text-text font-poppins"
                style={{
                  fontSize: moderateScale(24),
                  fontFamily: 'Poppins-Bold',
                  letterSpacing: -0.6,
                }}
              >
                Hi, Welcome Back
              </Text>
              <Text
                className="text-text-muted font-poppins"
                style={{
                  marginTop: 2,
                  fontSize: S.fs.sm,
                  fontFamily: 'Poppins-Regular',
                }}
              >
                Good Morning
              </Text>
            </View>

            <TouchableOpacity
              accessibilityLabel="Open notifications"
              accessibilityRole="button"
              onPress={() => navigation.navigate('Notification')}
              className="bg-card border border-border items-center justify-center"
              style={{
                width: moderateScale(40),
                height: moderateScale(40),
                borderRadius: moderateScale(20),
              }}
            >
              <NotificationIcon width={20} height={20} color={colors.surfaceDark} />
            </TouchableOpacity>
          </View>

          {/* Balance metrics */}
          <View style={{ flexDirection: 'row', marginTop: moderateScale(34) }}>
            <MetricBlock
              Icon={IncomeIcon}
              label="Total Balance"
              value="$7,783.00"
            />
            <View
              className="bg-border"
              style={{
                width: 1,
                marginHorizontal: moderateScale(18),
              }}
            />
            <MetricBlock
              Icon={ExpenseIcon}
              label="Total Expense"
              value="-$1.187.40"
              isNegative
            />
          </View>

          {/* Progress bar */}
          <View style={{ marginTop: moderateScale(22) }}>
            <View
              className="bg-progress overflow-hidden justify-center"
              style={{
                height: moderateScale(28),
                borderRadius: moderateScale(16),
              }}
            >
              {/* Fill */}
              <View
                className="bg-surface-dark absolute top-0 left-0 bottom-0"
                style={{
                  width: '30%',
                  borderRadius: moderateScale(16),
                }}
              />

              {/* Labels */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: moderateScale(20),
                }}
              >
                <Text
                  className="text-card font-poppins"
                  style={{
                    fontSize: S.fs.xs,
                    fontFamily: 'Poppins-Medium',
                  }}
                >
                  30%
                </Text>
                <Text
                  className="text-text font-poppins"
                  style={{
                    fontSize: S.fs.sm,
                    fontFamily: 'Poppins-SemiBold',
                    fontStyle: 'italic',
                  }}
                >
                  $20,000.00
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
              <CheckIcon width={15} height={15} color={colors.primary500} />
              <Text
                className="text-text font-poppins"
                style={{
                  marginLeft: 9,
                  fontSize: S.fs.md,
                  fontFamily: 'Poppins-Regular',
                }}
              >
                30% Of Your Expenses, Looks Good.
              </Text>
            </View>
          </View>
        </View>

        {/* ── White / dark sheet ── */}
        <View
          className="bg-card flex-1"
          style={{
            marginTop: moderateScale(18),
            borderTopLeftRadius: moderateScale(72),
            borderTopRightRadius: moderateScale(72),
            paddingTop: moderateScale(34),
            paddingHorizontal: moderateScale(36),
          }}
        >
          {/* Savings card */}
          <View
            className="bg-primary-500"
            style={{
              borderRadius: moderateScale(32),
              paddingHorizontal: moderateScale(24),
              paddingVertical: moderateScale(22),
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* Donut placeholder + label */}
            <View style={{ width: moderateScale(108), alignItems: 'center' }}>
              <View
                className="border-blue-700"
                style={{
                  width: moderateScale(70),
                  height: moderateScale(70),
                  borderRadius: moderateScale(35),
                  borderWidth: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CarIcon width={30} height={18} color={colors.surfaceDark} />
              </View>

              <Text
                className="text-surface-dark font-poppins text-center"
                style={{
                  marginTop: 10,
                  fontSize: S.fs.md,
                  fontFamily: 'Poppins-Regular',
                }}
              >
                Savings{'\n'}On Goals
              </Text>
            </View>

            {/* Divider */}
            <View
              style={{
                width: 1,
                alignSelf: 'stretch',
                backgroundColor: 'rgba(255,255,255,0.95)',
                marginHorizontal: moderateScale(16),
              }}
            />

            {/* Revenue + Food rows */}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <SalaryIcon width={28} height={28} color={colors.surfaceDark} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text
                    className="text-surface-dark font-poppins"
                    style={{
                      fontSize: S.fs.sm,
                      fontFamily: 'Poppins-Regular',
                    }}
                  >
                    Revenue Last Week
                  </Text>
                  <Text
                    className="text-surface-dark font-poppins"
                    style={{
                      marginTop: 3,
                      fontSize: moderateScale(16),
                      fontFamily: 'Poppins-Bold',
                    }}
                  >
                    $4.000.00
                  </Text>
                </View>
              </View>

              <View
                style={{
                  height: 1.4,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  marginVertical: 12,
                }}
              />

              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <FoodIcon width={22} height={28} color={colors.surfaceDark} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text
                    className="text-surface-dark font-poppins"
                    style={{
                      fontSize: S.fs.sm,
                      fontFamily: 'Poppins-Regular',
                    }}
                  >
                    Food Last Week
                  </Text>
                  <Text
                    className="text-finance-expense font-poppins"
                    style={{
                      marginTop: 3,
                      fontSize: moderateScale(16),
                      fontFamily: 'Poppins-Bold',
                    }}
                  >
                    -$100.00
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Tab segment */}
          <View
            className="bg-surface-pill"
            style={{
              marginTop: moderateScale(28),
              borderRadius: moderateScale(22),
              padding: 5,
              flexDirection: 'row',
            }}
          >
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <TouchableOpacity
                  key={tab}
                  accessibilityRole="button"
                  onPress={() => setActiveTab(tab)}
                  className={isActive ? 'bg-primary-500' : 'bg-transparent'}
                  style={{
                    flex: 1,
                    borderRadius: moderateScale(18),
                    paddingVertical: moderateScale(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    className={
                      isActive
                        ? 'text-surface-dark font-poppins'
                        : 'text-text-muted font-poppins'
                    }
                    style={{
                      fontSize: moderateScale(14),
                      fontFamily: isActive ? 'Poppins-Medium' : 'Poppins-Regular',
                    }}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Transaction list */}
          <View
            style={{
              marginTop: moderateScale(26),
              paddingBottom: moderateScale(10),
            }}
          >
            {transactions.map((item) => (
              <TransactionRow key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}