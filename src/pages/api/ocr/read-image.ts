import type { NextApiRequest, NextApiResponse } from "next";
import type { APIResponse } from "~/types/api.types";
import { OCRService } from "~/services/ocr.service";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<APIResponse | unknown>
) {
	if (req.method === "POST") {
		try {
			const image = req.body.imageUrl;
			const result = await OCRService.readImage(image);

			res.status(200).json({ result });
		} catch (err) {
			res.status(500).send(err);
		}
	} else {
		res.status(405).send({
			statusCode: 405,
			message: "Invalid http method"
		});
	}
}
