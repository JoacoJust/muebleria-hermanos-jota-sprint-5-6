const js = require("@eslint/js");
const globals = require("globals");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const eslintConfigPrettier = require("eslint-config-prettier");

const reactRules = {
  ...react.configs.recommended.rules,
  ...reactHooks.configs.recommended.rules,
  "react/react-in-jsx-scope": "off",
  "react/prop-types": "off",
};

module.exports = [
  {
    ignores: [
      "**/node_modules/**",
      "**/build/**",
      "**/coverage/**",
      "muebleria-hermanos-jota/**",
      "legacy/**",
      "docs/brand-kit/**",
      "scripts/**",
    ],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["*.config.js", "backend/**/*.js", "commitlint.config.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
    rules: {
      eqeqeq: ["error", "always"],
      "no-var": "error",
    },
  },
  {
    files: ["backend/**/*.test.js"],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest },
    },
  },
  {
    files: ["client/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, process: "readonly" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      eqeqeq: ["error", "always"],
      "no-var": "error",
      ...reactRules,
    },
  },
  {
    files: ["client/**/*.test.{js,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest, ...globals.node },
    },
  },
  {
    files: ["client/{postcss,tailwind}.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
  },
];
