import express, { Router } from "express";
import { createEvent, getAllEvents, getEvent, updateEvent, 
    deleteEvent } from "../controllers/eventController"

const eventRouter: Router = express.Router();

eventRouter.post("/events", createEvent);
eventRouter.get("/events", getAllEvents);
eventRouter.get("/events/:id", getEvent);
eventRouter.put("/events/:id", updateEvent);
eventRouter.delete("/events/:id", deleteEvent);

export default eventRouter;