import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';

export default [
  { ignores: ['dist', 'node_modules'] },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.es2021 },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // ── Bawaan ESLint ──────────────────────────────────────
      ...js.configs.recommended.rules,

      // ── React ─────────────────────────────────────────────
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',       // tidak perlu import React di Vite
      'react/prop-types': 'off',               // pakai TypeScript jika butuh ini
      'react/display-name': 'warn',

      // ── React Hooks ───────────────────────────────────────
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',   // hooks hanya boleh di komponen/hook
      'react-hooks/exhaustive-deps': 'warn',   // dependency array harus lengkap

      // ── React Refresh (Vite HMR) ──────────────────────────
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // ── Logika umum ───────────────────────────────────────
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-duplicate-imports': 'error',
      'no-unreachable': 'error',

      // ── Import yang lupa ──────────────────────────────────
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

      // ── Async / Promise ───────────────────────────────────
      'no-async-promise-executor': 'error',
      'require-await': 'warn',

      // ── Gaya kode (ringan) ────────────────────────────────
      'eqeqeq': ['warn', 'always'],
      'no-var': 'error',
      'prefer-const': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];