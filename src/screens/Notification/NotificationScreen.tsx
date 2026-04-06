import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {
  useNavigation,
  type NavigationProp,
  type ParamListBase,
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  BellIcon,
  DollarIcon,
  StarIcon,
  TrendDownIcon,
} from '../../components/shared/Icons';
import { Header } from '../../components/shared/Header';
import { IconButton } from '../../components/shared/IconButton';
import { colors, darkColors, lightColors } from '../../theme/colors';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';

type NotifType = 'reminder' | 'update' | 'transaction' | 'expense';
type Tag = { label: string };
type NotifItem = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  tags?: Tag[];
};
type NotifGroup = { section: string; items: NotifItem[] };

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
        tags: [{ label: 'Food' }, { label: 'Dinner' }, { label: '-$70,40' }],
      },
    ],
  },
];

function NotifIcon({ type }: { type: NotifType }) {
  const iconSize = moderateScale(22);
  const iconColor = colors.primary500;

  const icon = (() => {
    switch (type) {
      case 'reminder':
        return <BellIcon color={iconColor} size={iconSize} />;
      case 'update':
        return <StarIcon color={iconColor} size={iconSize} />;
      case 'transaction':
        return <DollarIcon color={iconColor} size={iconSize} />;
      case 'expense':
        return <TrendDownIcon color={iconColor} size={iconSize} />;
      default:
        return null;
    }
  })();

  return (
    <View
      className="items-center justify-center bg-[#00D09E1A] dark:bg-[#00D09E26]"
      style={{
        width: moderateScale(48),
        height: moderateScale(48),
        borderRadius: moderateScale(14),
      }}
    >
      {icon}
    </View>
  );
}

function NotificationRow({
  item,
  isLast,
}: {
  item: NotifItem;
  isLast: boolean;
}) {
  return (
    <View
      className={
        isLast ? '' : 'border-b border-black/[0.05] dark:border-white/[0.1]'
      }
      style={{
        paddingVertical: moderateScale(16),
        borderBottomWidth: isLast ? 0 : 0.5,
      }}
    >
      <View className="flex-row items-start" style={{ gap: moderateScale(14) }}>
        <NotifIcon type={item.type} />

        <View style={{ flex: 1, gap: moderateScale(2) }}>
          <Text
            className="text-title"
            style={{
              fontSize: S.fs.md_h,
              fontFamily: 'Poppins-SemiBold',
            }}
          >
            {item.title}
          </Text>

          <Text
            className="text-text"
            style={{
              fontSize: S.fs.sm,
              fontFamily: 'Poppins-Regular',
              lineHeight: S.fs.sm * 1.4,
              opacity: 0.8,
            }}
          >
            {item.body}
          </Text>

          {item.tags ? (
            <Text
              className="text-primary-500"
              style={{
                fontSize: S.fs.xs,
                fontFamily: 'Poppins-SemiBold',
                marginTop: moderateScale(2),
              }}
            >
              {item.tags.map(tag => tag.label).join(' | ')}
            </Text>
          ) : null}

          <Text
            className="text-right text-primary-600 dark:text-primary-300"
            style={{
              fontSize: S.fs.xs,
              fontFamily: 'Poppins-Regular',
              marginTop: moderateScale(4),
              opacity: 0.9,
            }}
          >
            {item.time}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function NotificationScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const isDark = useColorScheme() === 'dark';
  const headerIconColor = isDark ? darkColors.title : lightColors.title;
  const statusBarBackgroundColor = isDark
    ? darkColors.background
    : lightColors.background;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={statusBarBackgroundColor}
      />

      <Header
        variant="centerTitle"
        title="Notification"
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
            <ArrowLeftIcon color={headerIconColor} size={moderateScale(22)} />
          </IconButton>
        }
      />

      <View
        className="flex-1 overflow-hidden bg-secondary-bg"
        style={{
          borderTopLeftRadius: moderateScale(72),
          borderTopRightRadius: moderateScale(72),
          paddingTop: S.space.lg,
        }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: S.space.paddingHorizontal,
            paddingTop: moderateScale(32),
            paddingBottom: moderateScale(40),
            gap: moderateScale(24),
          }}
          showsVerticalScrollIndicator={false}
        >
          {NOTIFICATIONS.map(group => (
            <View key={group.section} style={{ gap: moderateScale(4) }}>
              <Text
                className="text-text opacity-50"
                style={{
                  fontSize: S.fs.sm,
                  fontFamily: 'Poppins-Medium',
                }}
              >
                {group.section}
              </Text>

              <View>
                {group.items.map((item, itemIndex) => (
                  <NotificationRow
                    key={item.id}
                    item={item}
                    isLast={itemIndex === group.items.length - 1}
                  />
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
