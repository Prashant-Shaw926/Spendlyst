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

jest.mock('react-native/src/private/animated/NativeAnimatedHelper');
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock'),
);
