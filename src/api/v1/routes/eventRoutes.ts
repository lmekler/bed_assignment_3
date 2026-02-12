import express, { Router } from "express";
import { createEvent } from "../controllers/eventController"

// getAllEvents, getEvent, updateEvent, deleteEvent

const eventRouter: Router = express.Router();

eventRouter.post("/events", createEvent);
// eventRouter.get("/events", getAllEvents);
// eventRouter.get("/events/:id", getEvent);
// eventRouter.put("/events/:id", updateEvent);
// eventRouter.delete("/events/:id", deleteEvent);

export default eventRouter;