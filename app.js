import dotenv from 'dotenv';
dotenv.config(); // ← MUST be first line before all other imports

import express from "express";
import { config } from './src/config/environment.js';
import { logger } from "./src/middleware/logger.middleware.js";
import cookieParser from "cookie-parser";
import { apiRouter } from "./src/routes/api.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", apiRouter);

app.use((err, req, res, next) => {
    console.error("=== SERVER ERROR ===");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    console.error("===================");
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(config.port, () => {
    logger.info("Server is started");
    console.log(`Server is running on http://localhost:${config.port}`);
});