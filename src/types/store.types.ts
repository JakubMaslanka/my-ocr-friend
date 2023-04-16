import type { APIRequest, APIResponse } from "./api.types";

export type ActionType =
	| { type: "request" }
	| { type: "progressIncrease"; percent: number }
	| { type: "success"; result: APIResponse }
	| { type: "reset" };

export type OCRRequestType = (
	data: APIRequest,
	fallback: (error: unknown) => void
) => Promise<APIResponse | void>;

export interface StateType {
	ocrText: APIResponse | null;
	isConverting: boolean;
	convertingProgress: number;
}
