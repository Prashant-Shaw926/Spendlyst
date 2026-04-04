module.exports = {
  StyleSheet: {
    create: (styles) => styles,
  },
  cssInterop: (component) => component,
  rem: () => 16,
  useColorScheme: () => ({
    colorScheme: 'light',
    setColorScheme: jest.fn(),
    toggleColorScheme: jest.fn(),
  }),
};
