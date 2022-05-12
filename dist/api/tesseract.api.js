"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tesseractApi = void 0;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var http_status_codes_1 = require("http-status-codes");
var handler_1 = require("../handler");
var tesseract_service_1 = require("../services/tesseract.service");
exports.tesseractApi = (0, express_1.Router)();
exports.tesseractApi.post("/read-image", (0, express_validator_1.body)("imageUrl").exists(), handler_1.validationHandler, function (req, res) {
    tesseract_service_1.TesseractService.readImage(req.body.imageUrl)
        .then(function (result) {
        res.status(200).json({ result: result });
    })
        .catch(function (err) {
        res.status(500).send(err);
    });
});
exports.tesseractApi.post("/read-images", (0, express_validator_1.body)("images").isArray(), handler_1.validationHandler, function (req, res) {
    res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).send("Coming soon! =)");
});
