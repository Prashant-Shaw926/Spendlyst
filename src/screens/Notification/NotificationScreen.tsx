import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useNavigation, type NavigationProp, type ParamListBase } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  BellIcon,
  DollarIcon,
  StarIcon,
  TrendDownIcon,
} from '../../components/shared/FinanceIcons';
import { colors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

type NotifType = 'reminder' | 'update' | 'transaction' | 'expense';

type Tag = {
  label: string;
};

type NotifItem = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  tags?: Tag[];
};

type NotifGroup = {
  section: string;
  items: NotifItem[];
};

const NOTIFICATIONS: NotifGroup[] = [
  {
    section: 'Today',
    items: [
      {
        id: 't1',
        type: 'reminder',
        title: 'Reminder!',
        body: 'Set up your automatic saving to meet your savings goal...',
        time: '17:00 - April 24',
      },
      {
        id: 't2',
        type: 'update',
        title: 'New Update',
        body: 'Set up your automatic saving to meet your savings goal...',
        time: '17:00 - April 24',
      },
    ],
  },
  {
    section: 'Yesterday',
    items: [
      {
        id: 'y1',
        type: 'transaction',
        title: 'Transactions',
        body: 'A new transaction has been registered',
        time: '17:00 - April 24',
        tags: [
          { label: 'Groceries' },
          { label: 'Pantry' },
          { label: '-$100,00' },
        ],
      },
      {
        id: 'y2',
        type: 'reminder',
        title: 'Reminder!',
        body: 'Set up your automatic saving to meet your savings goal...',
        time: '17:00 - April 24',
      },
    ],
  },
  {
    section: 'This Weekend',
    items: [
      {
        id: 'w1',
        type: 'expense',
        title: 'Expense Record',
        body: 'We recommend that you be more attentive to your finances.',
        time: '17:00 - April 24',
      },
      {
        id: 'w2',
        type: 'transaction',
        title: 'Transactions',
        body: 'A new transaction has been registered',
        time: '17:00 - April 24',
        tags: [
          { label: 'Food' },
          { label: 'Dinner' },
          { label: '-$70,40' },
        ],
      },
    ],
  },
];

function NotifIcon({
  type,
}: {
  type: NotifType;
}) {
  const size = moderateScale(40);

  const icon = (() => {
    switch (type) {
      case 'reminder':
        return <BellIcon color={colors.surfaceDark} size={20} />;
      case 'update':
        return <StarIcon color={colors.surfaceDark} size={20} />;
      case 'transaction':
        return <DollarIcon color={colors.surfaceDark} size={20} />;
      case 'expense':
        return <TrendDownIcon color={colors.surfaceDark} size={20} />;
      default:
        return null;
    }
  })();

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: moderateScale(12),
        backgroundColor: colors.primary500,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(12),
        flexShrink: 0,
      }}
    >
      {icon}
    </View>
  );
}

function NotificationRow({
  item,
  isDark,
  isLast,
}: {
  item: NotifItem;
  isDark: boolean;
  isLast: boolean;
}) {
  const titleColor = isDark ? colors.card : colors.surfaceDark;
  const bodyColor = isDark ? 'rgba(255,255,255,0.84)' : colors.surfaceDark;
  const dividerColor = isDark ? 'rgba(255,255,255,0.72)' : colors.primary500;
  const timeColor = colors.blue700;
  const tagColor = isDark ? colors.primary500 : colors.blue700;

  return (
    <View
      style={{
        paddingVertical: moderateScale(16),
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: dividerColor,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <NotifIcon type={item.type} />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: S.fs.lg,
              fontFamily: 'Poppins-SemiBold',
              color: titleColor,
            }}
          >
            {item.title}
          </Text>

          <Text
            style={{
              marginTop: 2,
              fontSize: S.fs.sm,
              fontFamily: 'Poppins-Regular',
              color: bodyColor,
              lineHeight: S.fs.sm * 1.45,
              maxWidth: '95%',
            }}
          >
            {item.body}
          </Text>

          {item.tags ? (
            <Text
              style={{
                marginTop: 6,
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-SemiBold',
                color: tagColor,
              }}
            >
              {item.tags.map((tag) => tag.label).join(' | ')}
            </Text>
          ) : null}
        </View>
      </View>

      <Text
        style={{
          marginTop: moderateScale(10),
          fontSize: S.fs.xs,
          fontFamily: 'Poppins-Regular',
          color: timeColor,
          textAlign: 'right',
        }}
      >
        {item.time}
      </Text>
    </View>
  );
}

export default function NotificationScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const colorScheme = useColorScheme();
  const tabBarHeight = useBottomTabBarHeight();
  const isDark = colorScheme === 'dark';

  const screenBg = isDark ? colors.surfaceDeep : colors.primary500;
  const sheetBg = isDark ? colors.surfaceDark : colors.primary50;
  const titleColor = isDark ? colors.card : colors.surfaceDark;
  const sectionColor = isDark ? colors.card : colors.surfaceDark;
  const bellBg = isDark ? colors.blue700 : colors.primary100;
  const bellIconColor = isDark ? colors.card : colors.surfaceDark;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: screenBg }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={screenBg}
      />

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
            <ArrowLeftIcon color={titleColor} size={24} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: moderateScale(22),
              fontFamily: 'Poppins-Bold',
              color: titleColor,
              letterSpacing: -0.5,
            }}
          >
            Notification
          </Text>

          <View
            style={{
              width: moderateScale(40),
              height: moderateScale(40),
              borderRadius: moderateScale(20),
              backgroundColor: bellBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BellIcon color={bellIconColor} size={20} />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginTop: moderateScale(8),
          borderTopLeftRadius: moderateScale(72),
          borderTopRightRadius: moderateScale(72),
          backgroundColor: sheetBg,
        }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: moderateScale(36),
            paddingTop: moderateScale(26),
            paddingBottom: tabBarHeight + moderateScale(18),
          }}
          showsVerticalScrollIndicator={false}
        >
          {NOTIFICATIONS.map((group, groupIndex) => (
            <View
              key={group.section}
              style={{ marginBottom: groupIndex === NOTIFICATIONS.length - 1 ? 0 : moderateScale(14) }}
            >
              <Text
                style={{
                  fontSize: S.fs.sm,
                  fontFamily: 'Poppins-Medium',
                  color: sectionColor,
                  marginBottom: moderateScale(8),
                }}
              >
                {group.section}
              </Text>

              {group.items.map((item, itemIndex) => (
                <NotificationRow
                  key={item.id}
                  item={item}
                  isDark={isDark}
                  isLast={itemIndex === group.items.length - 1}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
