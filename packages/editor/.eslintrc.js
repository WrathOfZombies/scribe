/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@bots/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
};
