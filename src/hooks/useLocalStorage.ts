import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
	const [value, setValue] = useState(fallbackValue);

	useEffect(() => {
		const stored = localStorage.getItem(key);
		setValue(stored ? JSON.parse(stored) : fallbackValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key]);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
}
