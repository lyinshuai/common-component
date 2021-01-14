module.exports = {
  env: {
    browser: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['html'],
  extends: [
    './rules/best-practices',
    './rules/errors',
    './rules/es6',
    './rules/style',
    './rules/variables',
    './rules/import',
    './rules/node',
    './rules/promise'
  ].map(require.resolve),
  rules: {}
};
