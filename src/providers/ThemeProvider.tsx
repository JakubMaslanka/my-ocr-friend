import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState
} from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { getThemeBaseOnOS } from "~/utils/getThemeBaseOnOS";

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
	const [localStorageTheme, setLocalStorageTheme] = useLocalStorage("color-theme", initialTheme);
	const [theme, setTheme] = useState<ThemeContextType["theme"]>(initState || initialTheme);
	const rootContainer = useRef<HTMLElement>();

	const rawSetTheme = useCallback((rawTheme: ThemeContextType["theme"]) => {
		const isDark = rawTheme === "dark";

		// rootContainer.current!.classList.remove(isDark ? "light" : "dark");
		// rootContainer.current!.classList.add(rawTheme);

		// setLocalStorageTheme(rawTheme);
	}, []);

	if (initialTheme) {
		rawSetTheme(initialTheme);
	}

	useEffect(() => {
		rootContainer.current = document.documentElement;
		console.log(rootContainer.current);
		if (rootContainer.current) {
			rawSetTheme(theme);
		}
	}, [rawSetTheme, theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext };
export default ThemeProvider;
