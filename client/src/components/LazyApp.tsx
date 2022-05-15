import App from "./App";
import ThemeProvider from "../context/ThemeContext";
import ToastProvider from "../context/ToastContext";

const LazyApp = () => (
	<ToastProvider>
		<ThemeProvider initialTheme="light">
			<App />
		</ThemeProvider>
	</ToastProvider>
);

export default LazyApp;
