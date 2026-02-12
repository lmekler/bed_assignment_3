import express, { Express } from "express";
import eventRouter from "./api/v1/routes/eventRoutes";

// Initialize Express application
const app: Express = express();

app.use(express.json());

// Route handler for items
app.use("/api/v1", eventRouter);

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;