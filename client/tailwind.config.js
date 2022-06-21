const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	mode: "jit",
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			screens: {
				xxs: "380px",
				...defaultTheme.screens
			}
		}
	},
	plugins: [],
	variants: {
		extend: {
			backgroundColor: ["checked"],
			borderColor: ["checked"],
			inset: ["checked"],
			zIndex: ["hover", "active"]
		}
	}
};
