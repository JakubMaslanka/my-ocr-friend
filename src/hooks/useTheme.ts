import { useContext } from "react";
import { ThemeContext } from "~/providers/ThemeProvider";

export const useTheme = () => {
	const themeHelpers = useContext(ThemeContext);

	return themeHelpers;
};
