import type { OCRRequestType } from "src/types";

const url =
	process.env.NODE_ENV === "production"
		? "https://my-ocr-friend.herokuapp.com/ocr/read-image"
		: "http://localhost:5000/ocr/read-image";

export const makeRequest: OCRRequestType = async (data, fallback) => {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		return response.json();
	} catch (error) {
		fallback(error as unknown);
	}
};
