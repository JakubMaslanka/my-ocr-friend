"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSetup = void 0;
const express_1 = __importDefault(require("express"));
const appSetup = (app) => {
    if (!app) {
        return false;
    }
    try {
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.appSetup = appSetup;
