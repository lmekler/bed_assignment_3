import Joi from "joi";

// Post operation schemas organized by request part
export const postSchemas = 
{
    // POST /posts - Create new post
    create: 
    {
        body: Joi.object(
        {
            name: Joi.string().required().min(3).messages(
            {
                "any.required": "\"name\" is required",
                "string.min": "\"name\" length must be at least 3 characters long"
            }),
            date: Joi.date().required().greater(new Date().toISOString()).messages(
            {
                "any.required": "\"date\" is required",
                "date.greater": "\"date\" must be greater than \"now\""
            }),
            capacity: Joi.number().required().integer().min(5).messages(
            {
                "any.required": "\"capacity\" is required",
                "number.min": "\"capacity\" must be greater than or equal to 5",
                "number.integer": "\"capacity\" must be an integer"
            }),
            registrationCount: Joi.number().integer().max(Joi.ref(
                "capacity")).default(0).messages(
            {
                "number.max": "\"registrationCount\" must be less "
                + "than or equal to ref:capacity"
            }),
            status: Joi.string().valid("active", "cancelled", 
                "completed").default("active").messages(
            {
                "any.only": "\"status\" must be one of [active, cancelled, completed]"
            }),
            category: Joi.string().valid("conference", "workshop", 
                "meetup", "seminar", "general").required().messages(
            {
                "any.only": "\"category\" must be one of [conference, "
                + "workshop, meetup, seminar, general]"
            }),
            createdAt: Joi.date().default(new Date())
        }),
    },
};