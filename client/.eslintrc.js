module.exports = {
	ignorePatterns: ["**/*.js"],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "eslint-plugin-import", "prettier", "react", "react-hooks"],
	env: {
		browser: true
	},
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"plugin:react/recommended"
	],
	parserOptions: {
		project: "./tsconfig.json",
		sourceType: "module",
		tsconfigRootDir: __dirname,
		ecmaVersion: 2020,
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		"no-console": "off",
		camelcase: "off",
		"@typescript-eslint/camelcase": ["off"],
		"@typescript-eslint/no-var-requires": ["off"],
		"@typescript-eslint/ban-ts-comment": ["off"],
		"@typescript-eslint/no-non-null-assertion": "off",
		"react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
		"react/prop-types": "off",
		"react/display-name": "off",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": ["warn"],
		"no-shadow": "off",
		"@typescript-eslint/ban-ts-ignore": "off",
		"@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/ban-types": [
			"error",
			{
				extendDefaults: true,
				types: {
					"{}": false
				}
			}
		]
	},
	settings: {
		react: {
			version: "detect"
		}
	}
};
