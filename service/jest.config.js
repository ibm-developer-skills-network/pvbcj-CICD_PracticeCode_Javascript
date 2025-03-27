/**
 * Jest configuration
 */
module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageReporters: [
    'text',
    'lcov'
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  verbose: true
};