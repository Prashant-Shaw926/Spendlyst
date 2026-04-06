/* eslint-env jest */

require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-mmkv', () => {
  const storage = new Map();

  return {
    createMMKV: jest.fn().mockImplementation(() => ({
      set: (key, value) => {
        storage.set(key, String(value));
      },
      getString: (key) => storage.get(key),
      remove: (key) => {
        storage.delete(key);
      },
      clearAll: () => {
        storage.clear();
      },
    })),
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@notifee/react-native', () => {
  const authorizationStatus = { authorizationStatus: 0 };

  return {
    __esModule: true,
    default: {
      createChannel: jest.fn().mockResolvedValue('spendlyst-general'),
      displayNotification: jest.fn().mockResolvedValue(undefined),
      getNotificationSettings: jest.fn().mockResolvedValue(authorizationStatus),
      onForegroundEvent: jest.fn().mockReturnValue(jest.fn()),
      requestPermission: jest.fn().mockResolvedValue(authorizationStatus),
    },
    AndroidImportance: {
      HIGH: 4,
    },
    EventType: {
      PRESS: 1,
      ACTION_PRESS: 2,
      DISMISSED: 3,
    },
  };
});

jest.mock('@react-native-firebase/messaging', () => {
  const messagingModule = {
    getToken: jest.fn().mockResolvedValue('test-fcm-token'),
    isDeviceRegisteredForRemoteMessages: true,
    onMessage: jest.fn().mockReturnValue(jest.fn()),
    onTokenRefresh: jest.fn().mockReturnValue(jest.fn()),
    registerDeviceForRemoteMessages: jest.fn().mockResolvedValue(undefined),
  };

  const messaging = jest.fn(() => messagingModule);

  return {
    __esModule: true,
    default: messaging,
  };
});

jest.mock('react-native/src/private/animated/NativeAnimatedHelper');
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock'),
);
