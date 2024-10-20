import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      "no-console": ["error"],

      "require-await": ["error"],
    },
  },
  pluginJs.configs.recommended,
];
