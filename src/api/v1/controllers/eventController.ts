import { Request, Response, NextFunction } from "express";
import { Event } from "../models/eventModel";
import { createEventService,} from "../services/eventService";
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";

export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => 
{
    try 
    {
        const 
        { 
            name, 
            date, 
            capacity, 
            registrationCount, 
            status, 
            category
        } = req.body;

        const event: Event = 
        { 
            name, 
            date, 
            capacity, 
            registrationCount, 
            status, 
            category
        };

        const eventResponse: Event = await createEventService(event);

        res.status(HTTP_STATUS.CREATED).json(
        {
            message: "Event created",
            data: eventResponse
        });
    }
    catch (error: unknown) 
    {
        next(error);
    }
};