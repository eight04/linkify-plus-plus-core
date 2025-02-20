import js from "@eslint/js";
import globals from "globals";
import compat from "eslint-plugin-compat";

export default [
  {
    ignores: [
      "dist",
      "dist-extension",
      "**/__snapshots__/*.js"
    ]
  },
  js.configs.recommended,
  compat.configs["flat/recommended"],
  {
    "rules": {
      "dot-notation": 2,
      "max-statements-per-line": 2,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha
      }
    }
  },
];
