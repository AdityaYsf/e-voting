import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules'] },

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node, ...globals.es2021 },
    },
    rules: {
      // ── Bawaan ESLint ──────────────────────────────────────
      ...js.configs.recommended.rules,

      // ── Logika umum ───────────────────────────────────────
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-duplicate-imports': 'error',
      'no-use-before-define': ['error', { functions: false }],

      // ── Async / Promise ───────────────────────────────────
      'no-async-promise-executor': 'error',
      'require-await': 'warn',
      'no-return-await': 'warn',

      // ── Node.js best practices ────────────────────────────
      'no-process-exit': 'warn',
      'handle-callback-err': 'error',

      // ── Console — di server console.log diizinkan ─────────
      'no-console': 'off',

      // ── Gaya kode ─────────────────────────────────────────
      'eqeqeq': ['warn', 'always'],
      'no-var': 'error',
      'prefer-const': 'warn',
    },
  },
];