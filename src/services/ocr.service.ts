import { createWorker } from "tesseract.js";
import { ReadingImageProgress } from "../types/reading-image-progress.interface";

export class OCRService {
	public static async readImage(
		imagePath: string,
		onProgress?: (status: ReadingImageProgress) => void
	): Promise<string> {
		const worker = await createWorker({
			logger: onProgress ? onProgress : () => null
		});

		await worker.loadLanguage("eng");
		await worker.initialize("eng");

		const {
			data: { text }
		} = await worker.recognize(imagePath);

		await worker.terminate();

		return text;
	}
}
