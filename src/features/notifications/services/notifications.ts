import { Platform } from 'react-native';
import notifee, {
  AndroidImportance,
  type Event,
  type Notification as NotifeeNotification,
} from '@notifee/react-native';
import messaging, {
  type FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { useAppStore } from '../../../store';
import type { NotificationPermissionStatus } from '../../../types/models';

type NotificationSnapshot = {
  authorizationStatus: number;
};

export const DEFAULT_NOTIFICATION_CHANNEL_ID = 'spendlyst-general';
export const DEFAULT_NOTIFICATION_PRESS_ACTION_ID = 'default';
export const DEFAULT_NOTIFICATION_SMALL_ICON = 'ic_stat_notification';

const DEFAULT_NOTIFICATION_CHANNEL_NAME = 'General Notifications';
const DEFAULT_NOTIFICATION_TITLE = 'Spendlyst';

type NotificationData = NonNullable<FirebaseMessagingTypes.RemoteMessage['data']>;

interface NormalizedNotificationPayload {
  id: string;
  title: string;
  body?: string;
  data: NotificationData;
}

let channelPromise: Promise<string> | null = null;
let bootstrapPromise: Promise<void> | null = null;

function getMessagingModule() {
  return messaging();
}

function extractString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function normalizeRemoteMessage(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
): NormalizedNotificationPayload | null {
  const data = remoteMessage.data ?? {};
  const title =
    remoteMessage.notification?.title ??
    extractString(data.title) ??
    extractString(data.notificationTitle);
  const body =
    remoteMessage.notification?.body ??
    extractString(data.body) ??
    extractString(data.message) ??
    extractString(data.notificationBody);

  if (!title && !body) {
    return null;
  }

  return {
    id:
      remoteMessage.messageId ??
      extractString(data.notificationId) ??
      `spendlyst-${Date.now()}`,
    title: title ?? DEFAULT_NOTIFICATION_TITLE,
    body,
    data,
  };
}

function mapAuthorizationStatus(
  authorizationStatus: number,
): NotificationPermissionStatus {
  switch (authorizationStatus) {
    case 0:
      return 'denied';
    case 1:
      return 'authorized';
    case 2:
      return 'provisional';
    case 3:
      return 'ephemeral';
    default:
      return 'not-determined';
  }
}

function isPermissionGranted(status: NotificationPermissionStatus): boolean {
  return (
    status === 'authorized' ||
    status === 'provisional' ||
    status === 'ephemeral'
  );
}

async function syncPermissionState(): Promise<NotificationPermissionStatus> {
  const store = useAppStore.getState();
  const currentSettings =
    (await notifee.getNotificationSettings()) as NotificationSnapshot;
  let permissionStatus = mapAuthorizationStatus(
    currentSettings.authorizationStatus,
  );
  const shouldRequestPermission =
    Platform.OS === 'android'
      ? !isPermissionGranted(permissionStatus)
      : !store.hasRequestedNotificationPermission &&
        permissionStatus === 'not-determined';
  let hasRequested =
    store.hasRequestedNotificationPermission ||
    shouldRequestPermission ||
    permissionStatus !== 'not-determined';

  if (shouldRequestPermission) {
    const requestedSettings =
      (await notifee.requestPermission()) as NotificationSnapshot;

    permissionStatus = mapAuthorizationStatus(
      requestedSettings.authorizationStatus,
    );
    hasRequested = true;
  }

  store.setNotificationPermissionStatus(permissionStatus);
  store.setHasRequestedNotificationPermission(hasRequested);

  return permissionStatus;
}

async function ensureRemoteMessagesRegistered() {
  if (
    Platform.OS === 'ios' &&
    !getMessagingModule().isDeviceRegisteredForRemoteMessages
  ) {
    await getMessagingModule().registerDeviceForRemoteMessages();
  }
}

async function syncFcmToken(permissionStatus: NotificationPermissionStatus) {
  const store = useAppStore.getState();

  if (!isPermissionGranted(permissionStatus)) {
    store.setFcmToken(null);
    return;
  }

  try {
    await ensureRemoteMessagesRegistered();

    const token = await getMessagingModule().getToken();
    store.setFcmToken(token);
  } catch {
    store.setFcmToken(null);
  }
}

async function displayNotification(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  const payload = normalizeRemoteMessage(remoteMessage);

  if (!payload) {
    return;
  }

  const notification: NotifeeNotification = {
    id: payload.id,
    title: payload.title,
    body: payload.body,
    data: payload.data,
    ios: {
      sound: 'default',
    },
  };

  if (Platform.OS === 'android') {
    const channelId = await ensureDefaultNotificationChannel();

    notification.android = {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: DEFAULT_NOTIFICATION_PRESS_ACTION_ID,
      },
      smallIcon: DEFAULT_NOTIFICATION_SMALL_ICON,
    };
  }

  await notifee.displayNotification(notification);
}

export async function ensureDefaultNotificationChannel(): Promise<string> {
  if (Platform.OS !== 'android') {
    return '';
  }

  if (!channelPromise) {
    channelPromise = notifee.createChannel({
      id: DEFAULT_NOTIFICATION_CHANNEL_ID,
      importance: AndroidImportance.HIGH,
      name: DEFAULT_NOTIFICATION_CHANNEL_NAME,
    });
  }

  return channelPromise;
}

export async function bootstrapNotifications(): Promise<void> {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      try {
        await ensureDefaultNotificationChannel();

        const permissionStatus = await syncPermissionState();
        await syncFcmToken(permissionStatus);
      } catch {
      }
    })();
  }

  return bootstrapPromise;
}

export function registerForegroundNotificationHandlers() {
  const unsubscribeFromMessages = getMessagingModule().onMessage(
    async remoteMessage => {
      await displayNotification(remoteMessage);
    },
  );
  const unsubscribeFromTokenRefresh = getMessagingModule().onTokenRefresh(
    token => {
      if (!isPermissionGranted(useAppStore.getState().notificationPermissionStatus)) {
        return;
      }

      useAppStore.getState().setFcmToken(token);
    },
  );
  const unsubscribeFromForegroundEvents = notifee.onForegroundEvent(
    () => undefined,
  );

  return () => {
    unsubscribeFromMessages();
    unsubscribeFromTokenRefresh();
    unsubscribeFromForegroundEvents();
  };
}

export async function handleBackgroundMessage(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  if (remoteMessage.notification) {
    return;
  }

  await displayNotification(remoteMessage);
}

export async function handleNotificationBackgroundEvent(_event: Event) {
}

export function __resetNotificationsForTests() {
  bootstrapPromise = null;
  channelPromise = null;
}
