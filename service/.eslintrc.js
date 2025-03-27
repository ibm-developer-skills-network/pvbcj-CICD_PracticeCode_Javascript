module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single']
  }
};