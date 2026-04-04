module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^react-native-css-interop/jsx-runtime$': '<rootDir>/__mocks__/reactNativeCssInteropJsxRuntimeMock.js',
    '^react-native-css-interop/jsx-dev-runtime$': '<rootDir>/__mocks__/reactNativeCssInteropJsxDevRuntimeMock.js',
    '^react-native-css-interop$': '<rootDir>/__mocks__/reactNativeCssInteropMock.js',
    '^react-native-css-interop/.+$': '<rootDir>/__mocks__/reactNativeCssInteropMock.js',
    '^react-native-linear-gradient$': '<rootDir>/__mocks__/linearGradientMock.js',
    '^react-native-gifted-charts$': '<rootDir>/__mocks__/giftedChartsMock.js',
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(svg)$': '<rootDir>/__mocks__/svgMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-safe-area-context|react-native-reanimated|react-native-gesture-handler|nativewind)/)',
  ],
};
