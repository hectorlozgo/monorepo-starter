import { createDefaultPreset } from 'ts-jest'
import type { Config } from 'jest'

const tsJestTransformCfg = createDefaultPreset().transform

const config: Config = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    ...tsJestTransformCfg
  },
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
}

export default config
