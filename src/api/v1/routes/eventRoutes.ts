import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { postSchemas } from "../validation/postSchemas";
import { createEvent, getAllEvents, getEvent,
    updateEvent, deleteEvent } from "../controllers/eventController"

const eventRouter: Router = express.Router();

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
eventRouter.post("/events", validateRequest(postSchemas.create), createEvent);

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve a list of events
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Successfully retrieved events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 count:
 *                   type: integer
 *                   description: Number of events returned in the response
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 message:
 *                   type: string
 *                   example: "Events retrieved successfully"
 */
eventRouter.get("/events", getAllEvents);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Retrieve an event by ID
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *                 message:
 *                   type: string
 *                   example: "Event retrieved successfully"
 */
eventRouter.get("/events/:id", getEvent);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registrationCount:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: ["active", "cancelled", "completed"]
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-01T10:00:00Z"
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *                 message:
 *                   type: string
 *                   example: "Event updated successfully"
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Registration count exceeds capacity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
eventRouter.put("/events/:id", validateRequest(postSchemas.update), updateEvent);

/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Delete an existing event
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   nullable: true
 *                 message:
 *                   type: string
 *                   example: "Event deleted successfully"
 *       '500':
 *         description: Failed to delete the event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
eventRouter.delete("/events/:id", deleteEvent);

export default eventRouter;