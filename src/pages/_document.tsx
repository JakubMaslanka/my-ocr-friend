import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="assets/favicon.ico" />
			<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png" />
			<link rel="manifest" href="assets/site.webmanifest" />
			<link rel="mask-icon" href="assets/safari-pinned-tab.svg" color="#5bbad5" />
			<link rel="apple-touch-icon" href="assets/logo192.png" />
			<link rel="manifest" href="assets/manifest.json" />
			<meta name="msapplication-TileImage" content="assets/mstile-144x144.png" />
			<meta name="msapplication-TileColor" content="#2b5797" />
			<meta name="theme-color" content="#ffffff" />
			<meta
				name="description"
				content="MY-OCR-FRIEND is a web free app allowing you to convert image into text."
			/>
			<meta name="author" content="Jakub Maslanka" />
			<meta
				name="keywords"
				content="OCR app online free ocr image-to-text image converter text from image generator"
			/>

			<title>MY-OCR-FRIEND</title>
			<Head />
			<body>
				<Main />
				<div id="toast-portal"></div>
				<NextScript />
			</body>
		</Html>
	);
}
