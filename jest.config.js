/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/__tests__'],
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    // permite imports absolutos tipo "@/..."
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
export default config;

