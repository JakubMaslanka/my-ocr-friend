"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var controllers_1 = require("./controllers");
var config_1 = require("./config");
var app = (0, express_1.default)();
dotenv_1.default.config();
if (!(0, config_1.appSetup)(app)) {
    process.exit(-99);
}
if (process.env.NODE_ENV === "development") {
    app.use((0, cors_1.default)());
}
app.use(express_1.default.static(path_1.default.join(__dirname, "../client", "build")));
app.get("*", function (_req, res) {
    res.sendFile(path_1.default.join(__dirname, "../client", "build", "index.html"));
});
app.use("/ocr", controllers_1.ocr);
app.listen(process.env.PORT, function () {
    console.log("OCR Server is listening at port ".concat(process.env.PORT || 5000));
});
exports.default = app;
