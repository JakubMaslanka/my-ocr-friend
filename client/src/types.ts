export type APIResponse = {
    result: string;
};

export type APIRequest = {
    imageUrl: string;
};

export type StateType = {
    ocrText: APIResponse | null;
    isConverting: boolean;
    convertingProgress: number;
}

export type ActionType =
| { type: 'request' }
| { type: 'progressIncrease', percent: number }
| { type: 'success', result: APIResponse }
| { type: 'reset'};

export type OCRRequestType = (data: APIRequest, fallback: (error: unknown) => void) => Promise<APIResponse | void>