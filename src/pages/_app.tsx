import type { AppProps } from "next/app";
import NotificationProvider from "~/providers/NotificationProvider";
import ThemeProvider from "~/providers/ThemeProvider";
import "~/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NotificationProvider>
			<ThemeProvider initialTheme="light">
				<Component {...pageProps} />
			</ThemeProvider>
		</NotificationProvider>
	);
}
