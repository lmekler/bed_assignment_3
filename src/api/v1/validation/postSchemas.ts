import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the event
 *           example: "event_1"
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Name of the event
 *           example: "Graduation"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Must be a future date (greater than the current date and time)
 *           example: "2026-05-01T10:00:00Z"
 *         capacity:
 *           type: integer
 *           minimum: 5
 *           description: Must be a whole number greater than or equal to 5
 *         registrationCount:
 *           type: integer
 *           default: 0
 *           description: Must be a whole number that is less than or equal to the capacity
 *         status:
 *            type: string
 *            enum: ["active", "cancelled", "completed"]
 *            default: "active"
 *         category:
 *            type: string
 *            enum: ["conference", "workshop", "meetup", "seminar", "general"]
 *         createdAt:
 *            type: string
 *            format: date-time
 *            example: "2026-05-01T10:00:00Z"
 */
export const postSchemas = 
{
    create: 
    {
        body: Joi.object(
        {
            name: Joi.string().required().min(3),
            date: Joi.date().required().greater(new Date().toISOString()),
            capacity: Joi.number().required().integer().min(5),
            registrationCount: Joi.number().optional().integer().max(Joi.ref(
                "capacity")).default(0),
            status: Joi.string().optional().valid("active", "cancelled", 
                "completed").default("active"),
            category: Joi.string().optional().valid("conference", "workshop", 
                "meetup", "seminar", "general"),
            createdAt: Joi.date().default(new Date())
        }),
    },

    update: 
    {
        body: Joi.object(
        {
            registrationCount: Joi.number().optional().integer(),
            status: Joi.string().optional().valid("active", "cancelled", "completed"),
            updatedAt: Joi.date().default(new Date())
        }),
    }
};