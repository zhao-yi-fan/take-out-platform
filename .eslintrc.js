module.exports = {
    root: true,
    env: { node: true, browser: true },
    extends: [
      "plugin:vue/essential",
      "standard",
      "prettier",
    ],
    parserOptions: { ecmaVersion: 2020 },
    rules: {
      "no-console": "off",
      "no-debugger": "off"
    },
  };
  