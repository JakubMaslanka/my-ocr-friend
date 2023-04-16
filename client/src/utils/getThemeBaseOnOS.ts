export const getThemeBaseOnOS = (): string => {
	if (typeof window !== "undefined" && window.localStorage) {
		const storedTheme = window.localStorage.getItem("color-theme");

		if (typeof storedTheme === "string") {
			return storedTheme;
		}

		const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
		if (userMedia.matches) {
			return "dark";
		}
	}
};
