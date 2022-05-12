import sharp, { Sharp } from "sharp";

type PreprocessImageType = { buffer: Buffer; type: string };

export class ResizeService {
	private static getDimension(
		dimensions: number | undefined,
		size?: number | undefined
	) {
		//TODO: add logic that calculates the scaled dimension based on the image size
		return Math.round(dimensions! / 1.25);
	}

	public static preprocessToBuffer(image: string): PreprocessImageType {
		const parts = image.split(";");
		const type = parts[0].split(":")[1];
		const data = parts[1].split(",")[1];
		const buffer = Buffer.from(data, "base64");

		return { buffer, type };
	}

	public static async decrease(
		imageData: PreprocessImageType
	): Promise<string> {
		const { buffer, type } = imageData;
		const image: Sharp = sharp(buffer);

		const { width, height, size } = await image.metadata();
		await image.resize(
			this.getDimension(width, size),
			this.getDimension(height, size)
		);

		return await image.toBuffer().then((bufferedImage) => {
			const data = bufferedImage.toString("base64");
			return `data:${type};base64,${data}`;
		});
	}
}
