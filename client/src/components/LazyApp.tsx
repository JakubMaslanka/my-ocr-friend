import React from "react";
import App from "./App";
import OverlayProvider from "../context/OverlayContext";
import ToastProvider from "../context/ToastContext";
import ThemeProvider from "../context/ThemeContext";

const LazyApp = () => (
	<OverlayProvider>
		<ToastProvider>
			<ThemeProvider initialTheme="light">
				<App />
			</ThemeProvider>
		</ToastProvider>
	</OverlayProvider>
);

export default LazyApp;
