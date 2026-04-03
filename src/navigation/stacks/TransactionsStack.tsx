import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { TransactionsStackParamList } from '../../types/navigation';
import { TransactionsScreen } from '../../screens/Transactions/TransactionsScreen';
import { AddTransactionScreen } from '../../screens/Transactions/AddTransactionScreen';
import { TransactionDetailScreen } from '../../screens/Transactions/TransactionDetailScreen';
import { colors } from '../../theme/colors';
import NotificationScreen from '../../screens/Notification/NotificationScreen';

const Stack = createNativeStackNavigator<TransactionsStackParamList>();

export function TransactionsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
      />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
