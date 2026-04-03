import { Text, View } from 'react-native';
import { S } from '../../theme/scale';
import { moderateScale } from '../../utils/responsive';
import { colors } from '../../theme/colors';
 
export interface Transaction {
  id:         string;
  title:      string;
  meta:       string;      // timestamp string
  category:   string;
  amount:     string;
  isNegative: boolean;
  iconBg:     string;      // raw hex — circle bg
  icon:       string;      // emoji placeholder
}
 
export const TRANSACTION_DATA: Transaction[] = [
  {
    id:         '1',
    title:      'Salary',
    meta:       '18:27 - April 30',
    category:   'Monthly',
    amount:     '$4.000,00',
    isNegative: false,
    iconBg:     '#0068FF', // blue-700
    icon:       '💵',
  },
  {
    id:         '2',
    title:      'Groceries',
    meta:       '17:00 - April 24',
    category:   'Pantry',
    amount:     '-$100,00',
    isNegative: true,
    iconBg:     '#3299FF', // blue-500
    icon:       '🛒',
  },
  {
    id:         '3',
    title:      'Rent',
    meta:       '8:30 - April 15',
    category:   'Rent',
    amount:     '-$674,40',
    isNegative: true,
    iconBg:     '#6DB6FE', // blue-300
    icon:       '🏠',
  },
  {
    id:         '4',
    title:      'Transport',
    meta:       '9:30 - April 08',
    category:   'Fuel',
    amount:     '-$4,13',
    isNegative: true,
    iconBg:     '#0068FF', // blue-700
    icon:       '🚌',
  },
];
 
export function TransactionRow({
  item,
  isDark,
  isLast,
}: {
  item:   Transaction;
  isDark: boolean;
  isLast: boolean;
}) {
  const textPrimary = isDark ? colors.card : colors.surfaceDark;
  const textMuted = isDark ? colors.textTertiary : colors.textSecondary;
  const dividerColor = isDark ? colors.surfaceRaised : colors.border;
 
  return (
    <View
      style={{
        flexDirection:     'row',
        alignItems:        'center',
        paddingVertical:   S.space.md,
        borderBottomWidth: isLast ? 0 : 0.5,
        borderBottomColor: dividerColor,
      }}
    >
      {/* Icon circle */}
      <View
        style={{
          width:           moderateScale(48),
          height:          moderateScale(48),
          borderRadius:    9999,
          backgroundColor: item.iconBg,
          alignItems:      'center',
          justifyContent:  'center',
          marginRight:     S.space.md,
        }}
      >
        <Text style={{ fontSize: S.fs.sm, color: '#FFFFFF' }}>{item.icon}</Text>
      </View>
 
      {/* Title + meta */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize:     S.fs.sm,
            fontFamily:   'Poppins-SemiBold',
            color:        textPrimary,
            marginBottom: 2,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize:   S.fs.xxs,
            fontFamily: 'Poppins-Regular',
            color: colors.primary500,
          }}
        >
          {item.meta}
        </Text>
      </View>
 
      {/* Category */}
      <Text
        style={{
          fontSize:    S.fs.xs,
          fontFamily:  'Poppins-Regular',
          color:       textMuted,
          marginRight: S.space.sm,
        }}
      >
        {item.category}
      </Text>
 
      {/* Vertical divider */}
      <View
        style={{
          width:           0.5,
          height:          S.space.xl,
          backgroundColor: dividerColor,
          marginRight:     S.space.sm,
        }}
      />
 
      {/* Amount */}
      <Text
        style={{
          fontSize:   S.fs.sm,
          fontFamily: 'Poppins-SemiBold',
          color:      item.isNegative
            ? colors.blue500
            : textPrimary,
          minWidth:   moderateScale(72),
          textAlign:  'right',
        }}
      >
        {item.amount}
      </Text>
    </View>
  );
}