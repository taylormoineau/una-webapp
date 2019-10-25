module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {jsx: true}
  },
  env: {browser: true, es6: true, node: true, mocha: true},
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['prettier', 'react', 'sonarjs'],
  rules: {
    'no-console': 'off',
    'prettier/prettier': ['warn', {singleQuote: true, bracketSpacing: false}],
    'dot-notation': 'warn',
    'quote-props': ['warn', 'as-needed'],
    'arrow-body-style': ['warn', 'as-needed'],
    'object-shorthand': 'warn',
    'sonarjs/cognitive-complexity': 'off',
    'react/prop-types': 'off'
  }
};