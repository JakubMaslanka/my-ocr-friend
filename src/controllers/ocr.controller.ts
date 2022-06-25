import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { ReadImageRequest } from "../interfaces";
import { OCRService } from "../services";

export const ocr: Router = Router();

const validation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(StatusCodes.BAD_REQUEST).json(errors);
};

ocr.post(
  "/read-image",
  body("imageUrl").exists(),
  validation,
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
