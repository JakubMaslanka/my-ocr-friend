import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validationHandler } from "../handler";
import { ReadImageRequest } from "../interfaces/read-image.request";
import { OCRService, ResizeService } from "../services";

export const ocrApi: Router = Router();

ocrApi.post(
	"/read-image",
	body("imageUrl").exists(),
	validationHandler,
	async (req: Request<{}, {}, ReadImageRequest>, res: Response) => {
		try {
			const imageData = ResizeService.preprocessToBuffer(req.body.imageUrl);

			const image = await ResizeService.decrease(imageData);
			const result = await OCRService.readImage(image);

			res.status(200).json({ result });
		} catch (err) {
			res.status(500).send(err);
		}
	}
);
