import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import eventRouter from "./api/v1/routes/eventRoutes";

// Initialize Express application
const app: Express = express();

app.use(express.json());

// Route handler for events
app.use("/api/v1", eventRouter);

// Integrate Morgan for HTTP request logging.
app.use(morgan("combined"));

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;