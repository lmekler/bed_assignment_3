import express, { Express } from "express";
import eventRouter from "./api/v1/routes/eventRoutes";
import morgan from "morgan";

// Initialize Express application
const app: Express = express();

app.use(express.json());

// Route handler for items
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