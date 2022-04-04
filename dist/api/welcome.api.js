"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeApi = void 0;
const express_1 = require("express");
exports.welcomeApi = (0, express_1.Router)();
exports.welcomeApi.all('', (req, res) => {
    res.send('Welcome to Node OCR Tesseract Demo. =)\nSend a POST request to /tesseract/read-image. For more information, read the readme.md file at this project. =)');
});
