"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TesseractService = void 0;
const tesseract_js_1 = require("tesseract.js");
class TesseractService {
    static async readImage(imagePath, onProgress) {
        const worker = (0, tesseract_js_1.createWorker)({
            logger: onProgress ? onProgress : () => null,
        });
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        return worker.recognize(imagePath).then(value => value.data.text);
    }
    static async readSeveralImages(imageList) {
        return [];
    }
}
exports.TesseractService = TesseractService;
