import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { tesseractApi, welcomeApi } from './api';
import { appSetup } from './config';

const app = express();

// Initialize environment config
dotenv.config();

// Setup express application
if (!appSetup(app)) {
  process.exit(-99);
}

// Disable CORS in development mode
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.use(express.static(path.join(__dirname, "../client", "build")));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

// Setup routes
app.use('', welcomeApi);
app.use('/tesseract', tesseractApi);

// Start server
app.listen(process.env.SERVER_PORT, () => {
  // tslint:disable-next-line: no-console
  console.log(`OCR Server is listening at port ${process.env.SERVER_PORT}`);
});

export default app;
