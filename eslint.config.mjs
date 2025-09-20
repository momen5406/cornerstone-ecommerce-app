import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // turn off completely
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",

      // OR (safer): just warn instead of error
      // "@typescript-eslint/no-unused-vars": [
      //   "warn",
      //   { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      // ],
      // "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
