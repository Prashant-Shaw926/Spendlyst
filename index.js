import { AppRegistry } from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import {
  handleBackgroundMessage,
  handleNotificationBackgroundEvent,
} from './src/features/notifications/services/notifications';

messaging().setBackgroundMessageHandler(handleBackgroundMessage);
notifee.onBackgroundEvent(handleNotificationBackgroundEvent);

AppRegistry.registerComponent(appName, () => App);
