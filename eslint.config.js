import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "no-console": ["error"],

      "require-await": ["error"],
    },
  },
  pluginJs.configs.recommended,
];
