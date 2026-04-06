import { useEffect } from 'react';
import {
  bootstrapNotifications,
  registerForegroundNotificationHandlers,
} from '../../services/notifications/notifications';

export function NotificationsBootstrap() {
  useEffect(() => {
    const unsubscribe = registerForegroundNotificationHandlers();

    void bootstrapNotifications();

    return unsubscribe;
  }, []);

  return null;
}
