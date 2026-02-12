import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { postSchemas } from "../validation/postSchemas";
import { createEvent, getAllEvents, getEvent,
    updateEvent, deleteEvent } from "../controllers/eventController"


// getAllEvents, getEvent, updateEvent, deleteEvent

const eventRouter: Router = express.Router();

eventRouter.post("/events", validateRequest(postSchemas.create), createEvent);
eventRouter.get("/events", getAllEvents);
eventRouter.get("/events/:id", getEvent);
eventRouter.put("/events/:id", validateRequest(postSchemas.update), updateEvent);
eventRouter.delete("/events/:id", deleteEvent);

export default eventRouter;