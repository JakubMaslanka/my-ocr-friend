import { Request, Response, Router } from "express";
// import sharp from "sharp";
import { body } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { validationHandler } from "../handler";
import { ReadImageRequest } from "../interfaces/read-image.request";
import { OCRService } from "../services/ocr.service";

export const ocrApi: Router = Router();

ocrApi.post(
	"/read-image",
	body("imageUrl").exists(),
	validationHandler,
	(req: Request<{}, {}, ReadImageRequest>, res: Response) => {
		const image = req.body.imageUrl;

		OCRService.readImage(image)
			.then((result: string) => {
				res.status(200).json({ result });
			})
			.catch((err) => {
				res.status(500).send(err);
			});
	}
);
