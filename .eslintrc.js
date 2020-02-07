module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  env: { browser: true, es6: true, node: true, mocha: true },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:sonarjs/recommended',
    'plugin:import/errors',
    'plugin:jsx-a11y/recommended',
    'prettier/react'
  ],
  plugins: ['prettier', 'react', 'sonarjs', 'jsx-a11y', 'react-hooks'],
  rules: {
    'no-console': 'warn',
    'prettier/prettier': ['warn', { singleQuote: true, bracketSpacing: false }],
    'dot-notation': 'warn',
    'quote-props': ['warn', 'as-needed'],
    'arrow-body-style': ['warn', 'as-needed'],
    'object-shorthand': 'warn',
    'sonarjs/cognitive-complexity': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'sonarjs/no-duplicate-string': 'off'
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
};