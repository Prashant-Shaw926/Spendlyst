import { useEffect } from 'react';
import {
  bootstrapNotifications,
  registerForegroundNotificationHandlers,
} from '../services/notifications';

export function NotificationsBootstrap() {
  useEffect(() => {
    const unsubscribe = registerForegroundNotificationHandlers();

    bootstrapNotifications();

    return unsubscribe;
  }, []);

  return null;
}
