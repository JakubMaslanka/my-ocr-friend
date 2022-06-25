import { createWorker } from "tesseract.js";
import { ReadingImageProgress } from "../interfaces";

export class OCRService {
  public static async readImage(
    imagePath: string,
    onProgress?: (status: ReadingImageProgress) => void
  ): Promise<string> {
    const worker = createWorker({
      logger: onProgress ? onProgress : () => null,
    });

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    return worker.recognize(imagePath).then((value) => value.data.text);
  }
}
