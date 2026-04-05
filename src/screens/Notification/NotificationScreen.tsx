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
} from '../../components/shared/FinanceIcons';
import { Header } from '../../components/shared/Header';
import { IconButton } from '../../components/shared/IconButton';
import { colors, getSemanticColors } from '../../theme/colors';
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
        tags: [
          { label: 'Food' },
          { label: 'Dinner' },
          { label: '-$70,40' },
        ],
      },
    ],
  },
];

function NotifIcon({ type }: { type: NotifType }) {
  const iconSize = moderateScale(18);
  const iconColor = colors.surfaceDark;

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
      className="shrink-0 items-center justify-center bg-primary-500"
      style={{
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(12),
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
      className={isLast ? 'border-b-0' : 'border-b border-primary-500 dark:border-border'}
      style={{
        paddingVertical: moderateScale(14),
      }}
    >
      <View style={{ gap: moderateScale(6) }}>
        <View className="flex-row items-start" style={{ gap: moderateScale(12) }}>
          <NotifIcon type={item.type} />

          <View className="flex-1" style={{ gap: moderateScale(4) }}>
            <Text
              className="text-text"
              style={{
                fontSize: S.fs.md,
                fontFamily: 'Poppins-SemiBold',
                lineHeight: S.fs.md * 1.3,
              }}
            >
              {item.title}
            </Text>

            <Text
              className="text-text opacity-75"
              style={{
                fontSize: S.fs.sm,
                fontFamily: 'Poppins-Regular',
                lineHeight: S.fs.sm * 1.45,
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
                }}
              >
                {item.tags.map(tag => tag.label).join(' | ')}
              </Text>
            ) : null}
          </View>
        </View>

        <Text
          className="text-right text-blue-700"
          style={{
            fontSize: S.fs.xs,
            fontFamily: 'Poppins-Regular',
          }}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );
}

export default function NotificationScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const isDark = useColorScheme() === 'dark';
  const semanticColors = getSemanticColors(isDark);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={semanticColors.background}
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
            <ArrowLeftIcon color={semanticColors.title} size={moderateScale(22)} />
          </IconButton>
        }
      />

      <View
        className="flex-1 overflow-hidden bg-card"
        style={{
          borderTopLeftRadius: moderateScale(56),
          borderTopRightRadius: moderateScale(56),
          paddingVertical: S.space.lg,
        }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: moderateScale(28),
            paddingVertical: moderateScale(28),
            gap: moderateScale(20),
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
