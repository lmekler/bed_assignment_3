import express, { Router } from "express";
import { createEvent } from "../controllers/eventController"
import { validateRequest } from "../middleware/validate";
import { postSchemas } from "../validation/postSchemas";


// getAllEvents, getEvent, updateEvent, deleteEvent

const eventRouter: Router = express.Router();

eventRouter.post("/events", validateRequest(postSchemas.create), createEvent);

// eventRouter.get("/events", getAllEvents);
// eventRouter.get("/events/:id", getEvent);
// eventRouter.put("/events/:id", updateEvent);
// eventRouter.delete("/events/:id", deleteEvent);

export default eventRouter;