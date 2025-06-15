import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            indent: ["error", 4, { SwitchCase: 1 }],
            semi: ["error", "always"],
            "semi-style": ["error", "last"],
            "object-curly-spacing": ["error", "always"],

            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling", "index"],
                    ],
                    "newlines-between": "always",
                    alphabetize: { order: "asc", caseInsensitive: true },
                },
            ],
            "import/no-unresolved": "error",
            "import/no-duplicates": "error",
        },
    },
];

export default eslintConfig;
