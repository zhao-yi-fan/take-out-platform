module.exports = {
  root: true,
  env: { node: true, browser: true },
  extends: [
    "plugin:vue/vue3-essential",
    'plugin:vue/vue3-recommended',
    "standard",
    "prettier",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off"
  },
};
