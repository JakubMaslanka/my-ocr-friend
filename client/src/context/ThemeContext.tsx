import React, { useContext } from "react";

interface IThemeProvider {
	initialTheme: string;
	children: React.ReactNode;
}

type ThemeContextType = {
	theme: string;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const getInitialTheme = (): string => {
	if (typeof window !== "undefined" && window.localStorage) {
		const storedPrefs = window.localStorage.getItem("color-theme");
		if (typeof storedPrefs === "string") {
			return storedPrefs;
		}

		const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
		if (userMedia.matches) {
			return "dark";
		}
	}

	return "light";
};

const ThemeContext = React.createContext<ThemeContextType>({
	theme: "light",
	setTheme: () => console.log("test")
});

const ThemeProvider: React.FC<IThemeProvider> = ({
	initialTheme,
	children
}) => {
	const [theme, setTheme] = React.useState(getInitialTheme);

	const rawSetTheme = (rawTheme: string) => {
		const root = window.document.documentElement;
		const isDark = rawTheme === "dark";

		root.classList.remove(isDark ? "light" : "dark");
		root.classList.add(rawTheme);

		localStorage.setItem("color-theme", rawTheme);
	};

	if (initialTheme) {
		rawSetTheme(initialTheme);
	}

	React.useEffect(() => {
		rawSetTheme(theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

const useTheme = () => {
	const themeHelpers = useContext(ThemeContext);

	return themeHelpers;
};

export { ThemeContext, useTheme };
export default ThemeProvider;
