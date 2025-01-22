module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Explicitly set the test environment
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Use Babel to transform TypeScript and JSX
  },
};
