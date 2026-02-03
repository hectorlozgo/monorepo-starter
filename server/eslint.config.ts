import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['node_modules', 'dist', '**.config.ts']
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.node
    },
    extends: [js.configs.recommended]
  },
  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.recommended],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }]
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  }
])
