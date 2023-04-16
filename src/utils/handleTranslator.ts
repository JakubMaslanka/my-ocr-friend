export function handleTranslator(textToTranslate: string, fallback: () => void) {
	if (!textToTranslate) fallback();

	window.open(
		`https://www.deepl.com/translator#en/pl/${encodeURIComponent(textToTranslate)}`,
		"_blank"
	);
}
