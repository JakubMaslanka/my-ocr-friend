import type { OCRRequestType } from '../../types';

export const makeRequest: OCRRequestType = async (data, fallback) => {
    try {
        const response = await fetch('http://localhost:80/tesseract/read-image', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        return response.json();
    } catch (error) {
        fallback(error as unknown);
    }
};