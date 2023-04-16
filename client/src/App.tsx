import React from "react";
import ImageConverterPage from "./pages/ImageConverterPage";
import NotificationProvider from "./providers/NotificationProvider";
import ThemeProvider from "./providers/ThemeProvider";

const App = () => (
	<NotificationProvider>
		<ThemeProvider initialTheme="light">
			<ImageConverterPage />
		</ThemeProvider>
	</NotificationProvider>
);

export default App;
