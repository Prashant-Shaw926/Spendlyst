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
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';
import type { HomeStackParamList } from '../../types/navigation';
import type { FinanceIconProps } from '../../components/shared/FinanceIcons';
import {
  BagIcon,
  BellIcon,
  CarIcon,
  CheckSquareIcon,
  ForkKnifeIcon,
  KeyIcon,
  StackCashIcon,
} from '../../components/shared/FinanceIcons';

type TabKey = 'Daily' | 'Weekly' | 'Monthly';

type HomeTransaction = {
  id: string;
  title: string;
  time: string;
  category: string;
  amount: string;
  isExpense?: boolean;
  iconBg: string;
  Icon: React.ComponentType<FinanceIconProps>;
};

type HomePalette = {
  pageBg: string;
  headerBg: string;
  sheetBg: string;
  savingsCardBg: string;
  savingsCardText: string;
  title: string;
  subtitle: string;
  bellBg: string;
  bellBorder: string;
  bellIcon: string;
  metricLabel: string;
  positiveAmount: string;
  negativeAmount: string;
  divider: string;
  progressTrack: string;
  progressFill: string;
  progressText: string;
  segmentBg: string;
  segmentActiveBg: string;
  segmentActiveText: string;
  transactionTitle: string;
  transactionMeta: string;
  transactionAmount: string;
  transactionSeparator: string;
};

const LIGHT_BG = colors.primary50;
const DARK_BG = colors.surfaceDeep;

const TABS: TabKey[] = ['Daily', 'Weekly', 'Monthly'];

function getPalette(isDark: boolean): HomePalette {
  return {
    pageBg: isDark ? DARK_BG : colors.primary500,
    headerBg: isDark ? DARK_BG : colors.primary500,
    sheetBg: isDark ? colors.surfaceDark : LIGHT_BG,
    savingsCardBg: colors.primary500,
    savingsCardText: colors.surfaceDark,
    title: isDark ? colors.card : colors.surfaceDark,
    subtitle: isDark ? 'rgba(255,255,255,0.86)' : colors.surfaceDark,
    bellBg: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(241,255,243,0.95)',
    bellBorder: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(5,34,36,0.08)',
    bellIcon: colors.surfaceDark,
    metricLabel: isDark ? 'rgba(255,255,255,0.78)' : colors.surfaceDark,
    positiveAmount: isDark ? colors.card : colors.surfaceDark,
    negativeAmount: colors.blue700,
    divider: isDark ? 'rgba(255,255,255,0.34)' : 'rgba(5,34,36,0.18)',
    progressTrack: isDark ? colors.card : colors.primary50,
    progressFill: colors.surfaceDark,
    progressText: isDark ? colors.card : colors.surfaceDark,
    segmentBg: isDark ? colors.surfaceMedium : colors.primary100,
    segmentActiveBg: colors.primary500,
    segmentActiveText: colors.surfaceDark,
    transactionTitle: isDark ? colors.card : colors.surfaceDark,
    transactionMeta: isDark ? 'rgba(255,255,255,0.82)' : colors.surfaceDark,
    transactionAmount: isDark ? colors.card : colors.surfaceDark,
    transactionSeparator: colors.primary500,
  };
}

function MetricBlock({
  label,
  value,
  palette,
  isNegative,
}: {
  label: string;
  value: string;
  palette: HomePalette;
  isNegative?: boolean;
}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <CheckSquareIcon color={palette.metricLabel} size={13} />
        <Text
          style={{
            marginLeft: 6,
            fontSize: S.fs.sm,
            fontFamily: 'Poppins-Regular',
            color: palette.metricLabel,
          }}
        >
          {label}
        </Text>
      </View>

      <Text
        style={{
          fontSize: moderateScale(22),
          fontFamily: 'Poppins-Bold',
          color: isNegative ? palette.negativeAmount : palette.positiveAmount,
          letterSpacing: -0.5,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function TransactionRow({
  item,
  palette,
}: {
  item: HomeTransaction;
  palette: HomePalette;
}) {
  const AmountColor = item.isExpense ? palette.negativeAmount : palette.transactionAmount;

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
        <item.Icon color={colors.card} size={24} />
      </View>

      <View style={{ flex: 1, marginLeft: S.space.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1.4, paddingRight: S.space.md }}>
            <Text
              style={{
                fontSize: S.fs.md,
                fontFamily: 'Poppins-SemiBold',
                color: palette.transactionTitle,
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-SemiBold',
                color: colors.blue700,
                marginTop: 4,
              }}
              numberOfLines={1}
            >
              {item.time}
            </Text>
          </View>

          <View
            style={{
              width: 1,
              alignSelf: 'stretch',
              backgroundColor: palette.transactionSeparator,
              opacity: 0.7,
            }}
          />

          <View style={{ flex: 1, paddingHorizontal: S.space.md }}>
            <Text
              style={{
                fontSize: S.fs.sm,
                fontFamily: 'Poppins-Regular',
                color: palette.transactionMeta,
              }}
              numberOfLines={1}
            >
              {item.category}
            </Text>
          </View>

          <View
            style={{
              width: 1,
              alignSelf: 'stretch',
              backgroundColor: palette.transactionSeparator,
              opacity: 0.7,
            }}
          />

          <View style={{ minWidth: moderateScale(88), paddingLeft: S.space.md }}>
            <Text
              style={{
                fontSize: S.fs.md,
                fontFamily: 'Poppins-SemiBold',
                color: AmountColor,
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

export function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('Monthly');
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const palette = getPalette(isDark);

  const transactions = useMemo<HomeTransaction[]>(
    () => [
      {
        id: 'salary',
        title: 'Salary',
        time: '18:27 - April 30',
        category: 'Monthly',
        amount: '$4.000,00',
        iconBg: '#67ABF3',
        Icon: StackCashIcon,
      },
      {
        id: 'groceries',
        title: 'Groceries',
        time: '17:00 - April 24',
        category: 'Pantry',
        amount: '-$100,00',
        isExpense: true,
        iconBg: '#3790F9',
        Icon: BagIcon,
      },
      {
        id: 'rent',
        title: 'Rent',
        time: '8:30 - April 15',
        category: 'Rent',
        amount: '-$674,40',
        isExpense: true,
        iconBg: '#0D6CFF',
        Icon: KeyIcon,
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.pageBg }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={palette.headerBg}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: S.space['4xl'] }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: palette.headerBg,
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
            <View>
              <Text
                style={{
                  fontSize: moderateScale(24),
                  fontFamily: 'Poppins-Bold',
                  color: palette.title,
                  letterSpacing: -0.6,
                }}
              >
                Hi, Welcome Back
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  fontSize: S.fs.sm,
                  fontFamily: 'Poppins-Regular',
                  color: palette.subtitle,
                }}
              >
                Good Morning
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
                backgroundColor: palette.bellBg,
                borderWidth: 1,
                borderColor: palette.bellBorder,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BellIcon color={palette.bellIcon} size={20} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginTop: moderateScale(34) }}>
            <MetricBlock label="Total Balance" value="$7,783.00" palette={palette} />
            <View
              style={{
                width: 1,
                marginHorizontal: moderateScale(18),
                backgroundColor: palette.divider,
              }}
            />
            <MetricBlock
              label="Total Expense"
              value="-$1.187.40"
              palette={palette}
              isNegative
            />
          </View>

          <View style={{ marginTop: moderateScale(22) }}>
            <View
              style={{
                height: moderateScale(28),
                borderRadius: moderateScale(16),
                backgroundColor: palette.progressTrack,
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
                  width: '30%',
                  borderRadius: moderateScale(16),
                  backgroundColor: palette.progressFill,
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
                  30%
                </Text>
                <Text
                  style={{
                    fontSize: S.fs.sm,
                    fontFamily: 'Poppins-SemiBold',
                    color: palette.progressText,
                    fontStyle: 'italic',
                  }}
                >
                  $20,000.00
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
              <CheckSquareIcon color={palette.metricLabel} size={15} />
              <Text
                style={{
                  marginLeft: 9,
                  fontSize: S.fs.md,
                  fontFamily: 'Poppins-Regular',
                  color: palette.positiveAmount,
                }}
              >
                30% Of Your Expenses, Looks Good.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: moderateScale(18),
            borderTopLeftRadius: moderateScale(72),
            borderTopRightRadius: moderateScale(72),
            backgroundColor: palette.sheetBg,
            paddingTop: moderateScale(34),
            paddingHorizontal: moderateScale(36),
            flex: 1,
          }}
        >
          <View
            style={{
              borderRadius: moderateScale(32),
              backgroundColor: palette.savingsCardBg,
              paddingHorizontal: moderateScale(24),
              paddingVertical: moderateScale(22),
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ width: moderateScale(108), alignItems: 'center' }}>
              <View
                style={{
                  width: moderateScale(70),
                  height: moderateScale(70),
                  borderRadius: moderateScale(35),
                  borderWidth: 3,
                  borderColor: colors.blue700,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CarIcon color={palette.savingsCardText} size={30} />
              </View>

              <Text
                style={{
                  marginTop: 10,
                  fontSize: S.fs.md,
                  fontFamily: 'Poppins-Regular',
                  color: palette.savingsCardText,
                  textAlign: 'center',
                }}
              >
                Savings{'\n'}On Goals
              </Text>
            </View>

            <View
              style={{
                width: 1,
                alignSelf: 'stretch',
                backgroundColor: 'rgba(255,255,255,0.95)',
                marginHorizontal: moderateScale(16),
              }}
            />

            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <StackCashIcon color={palette.savingsCardText} size={28} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: S.fs.sm,
                      fontFamily: 'Poppins-Regular',
                      color: palette.savingsCardText,
                    }}
                  >
                    Revenue Last Week
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      fontSize: moderateScale(16),
                      fontFamily: 'Poppins-Bold',
                      color: palette.savingsCardText,
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
                <ForkKnifeIcon color={palette.savingsCardText} size={28} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: S.fs.sm,
                      fontFamily: 'Poppins-Regular',
                      color: palette.savingsCardText,
                    }}
                  >
                    Food Last Week
                  </Text>
                  <Text
                    style={{
                      marginTop: 3,
                      fontSize: moderateScale(16),
                      fontFamily: 'Poppins-Bold',
                      color: colors.blue700,
                    }}
                  >
                    -$100.00
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: moderateScale(28),
              borderRadius: moderateScale(22),
              backgroundColor: palette.segmentBg,
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
                  style={{
                    flex: 1,
                    borderRadius: moderateScale(18),
                    backgroundColor: isActive ? palette.segmentActiveBg : 'transparent',
                    paddingVertical: moderateScale(12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      fontFamily: isActive ? 'Poppins-Medium' : 'Poppins-Regular',
                      color: isActive ? palette.segmentActiveText : palette.transactionMeta,
                    }}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ marginTop: moderateScale(26), paddingBottom: moderateScale(10) }}>
            {transactions.map((item) => (
              <TransactionRow key={item.id} item={item} palette={palette} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
