export function handleClipboard(text: string, fallback: () => void): Promise<void> {
	if (!text) fallback();
	if (!window.navigator.clipboard) fallback();

	return navigator.clipboard.writeText(text);
}
