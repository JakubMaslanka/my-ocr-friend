import { useContext } from "react";
import { ThemeContext } from "src/providers/ThemeProvider";

export const useTheme = () => {
	const themeHelpers = useContext(ThemeContext);

	return themeHelpers;
};
