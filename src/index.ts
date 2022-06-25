import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import { ocr } from "./controllers";
import { appSetup } from "./config";

const app = express();

dotenv.config();

if (!appSetup(app)) {
  process.exit(-99);
}

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.use(express.static(path.join(__dirname, "../client", "build")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

app.use("/ocr", ocr);

app.listen(process.env.PORT, () => {
  console.log(`OCR Server is listening at port ${process.env.PORT || 5000}`);
});

export default app;
