"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const api_1 = require("./api");
const config_1 = require("./config");
const app = (0, express_1.default)();
// Initialize environment config
dotenv_1.default.config();
// Setup express application
if (!(0, config_1.appSetup)(app)) {
    process.exit(-99);
}
// Disable CORS in development mode
if (process.env.NODE_ENV === "development") {
    app.use((0, cors_1.default)());
}
app.use(express_1.default.static(path_1.default.join(__dirname, "../client", "build")));
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client", "build", "index.html"));
});
// Setup routes
app.use('', api_1.welcomeApi);
app.use('/tesseract', api_1.tesseractApi);
// Start server
app.listen(process.env.PORT, () => {
    // tslint:disable-next-line: no-console
    console.log(`OCR Server is listening at port ${process.env.PORT}`);
});
exports.default = app;
