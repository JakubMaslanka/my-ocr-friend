import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validationHandler } from "../handler";
import { ReadImageRequest, ReadingImageProgress } from "../interfaces";
import { OCRService } from "../services";

export const ocrApi: Router = Router();

ocrApi.post(
	"/read-image",
	body("imageUrl").exists(),
	validationHandler,
	async (req: Request<{}, {}, ReadImageRequest>, res: Response) => {
		try {
			const image = req.body.imageUrl;
			const result = await OCRService.readImage(image);

			res.status(200).json({ result });
		} catch (err) {
			res.status(500).send(err);
		}
	}
);
