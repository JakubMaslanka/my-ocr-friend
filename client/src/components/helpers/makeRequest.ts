import type { OCRRequestType } from "../../types";

const url =
	process.env.NODE_ENV === "production"
		? "https://my-ocr-friend.herokuapp.com/tesseract/read-image"
		: "http://localhost:5000/tesseract/read-image";

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
