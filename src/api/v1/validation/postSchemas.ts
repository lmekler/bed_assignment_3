import Joi from "joi";

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