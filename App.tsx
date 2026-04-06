import "./global.css"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NotificationsBootstrap } from './src/features/notifications/bootstrap/NotificationsBootstrap';
import { RootNavigator } from './src/navigation/RootNavigator';
 
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NotificationsBootstrap />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
