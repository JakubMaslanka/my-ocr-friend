import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useEffect,
	useState
} from "react";
import { getThemeBaseOnOS } from "src/utils/getThemeBaseOnOS";

interface ThemeContextType {
	theme: "dark" | "light" | string;
	setTheme: Dispatch<SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	setTheme: () => console.log("Setting the theme in local storage")
});

//TODO: fix theme initial function
const ThemeProvider: React.FC<{
	initialTheme: ThemeContextType["theme"];
	children: ReactNode;
}> = ({ initialTheme, children }) => {
	const initState = getThemeBaseOnOS();
	const [theme, setTheme] = useState<ThemeContextType["theme"]>(initState || initialTheme);

	const rawSetTheme = useCallback((rawTheme: ThemeContextType["theme"]) => {
		const root = window.document.documentElement;
		const isDark = rawTheme === "dark";

		root.classList.remove(isDark ? "light" : "dark");
		root.classList.add(rawTheme);

		localStorage.setItem("color-theme", rawTheme);
	}, []);

	if (initialTheme) {
		rawSetTheme(initialTheme);
	}

	useEffect(() => {
		rawSetTheme(theme);
	}, [rawSetTheme, theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext };
export default ThemeProvider;
