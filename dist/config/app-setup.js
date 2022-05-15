"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSetup = void 0;
var express_1 = __importDefault(require("express"));
var appSetup = function (app) {
    if (!app) {
        return false;
    }
    try {
        app.use(express_1.default.json({ limit: "250mb" }));
        app.use(express_1.default.urlencoded({ limit: "250mb", extended: true }));
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.appSetup = appSetup;
