/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'jest-coverage',
  collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/*.mock.ts',
      '!**/node_modules/**',
      '!**/dist/**',
  ],
  coverageReporters: ["json", "text", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
