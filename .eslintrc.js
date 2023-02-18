module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'airbnb/hooks',
  ],
  plugins: ['prettier', 'import', 'unused-imports'],
  rules: {
    semi: ['error'],
    'unused-imports/no-unused-imports': 'warn',
    'no-underscore-dangle': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'prettier/prettier': ['error'],
    'import/no-unresolved': 'error', // turn on errors for missing imports
    'react/jsx-filename-extension': [0, { extensions: ['.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': [
      0,
      { html: 'ignore', custom: 'ignore', explicitSpread: 'ignore' },
    ],
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    '@typescript-eslint/no-shadow': 0,
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': 1,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
