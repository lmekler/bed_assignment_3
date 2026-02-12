import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";
import { Event } from "../models/eventModel";
import { createEventService, getAllEventsService,
    getEventService, updateEventService,
    deleteEventService } from "../services/eventService";

export const createEvent = async (req: Request, 
    res: Response, next: NextFunction): Promise<void> => 
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

export const getAllEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => 
{
    try
    {
        const events = await getAllEventsService();
        res.status(HTTP_STATUS.OK).json(
        {
            message: "Events retrieved",
            count: events.length,
            data: events
        });
    }
    catch (error: unknown)
    {
        next(error);
    }
};

export const getEvent = async (req: Request, res: Response): Promise<void> =>
{
    const id: string = req.params.id.toString();
    const event: Event | undefined = await getEventService(id);

    if (event) 
    {
        res.status(HTTP_STATUS.OK).json(
        {
            message: "Event retrieved",
            data: event
        });
    }
    else
    {
        res.status(HTTP_STATUS.NOT_FOUND).json(
        {
            message: "Event not found"
        });
    }
};

export const updateEvent = async (req: Request, 
    res: Response, next: NextFunction): Promise<void> =>
{
    try
    {
        const id: string = req.params.id.toString();
        const {
            registrationCount,
            status
        }: {
            registrationCount?: number;
            status?: string;
        } = req.body;

        const updateData: Partial<Pick<Event, "registrationCount" | "status">> = 
        {
            registrationCount: registrationCount,
            status: status
        };

        try
        {
            const updatedEvent: Event | undefined = await updateEventService(id, updateData);

             if (!updatedEvent) 
            {
                res.status(HTTP_STATUS.NOT_FOUND).json(
                {
                    message: "Event not found",
                });
            } 
            else 
            {
                res.status(HTTP_STATUS.OK).json(
                {
                    message: "Event updated", 
                    data: updatedEvent
                });
            }
        }
        catch (error: any)
        {
            if (error.message === "Registration count exceeds event capacity")
            {
                res.status(HTTP_STATUS.BAD_REQUEST).json(
                {
                    error: error.message
                });
                return;
            }
            throw error;
        }
    } 
    catch (error: unknown) 
    {
        next(error);
    }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> =>
{
    const id: string = req.params.id.toString();

    if (await deleteEventService(id))
    {
        res.status(HTTP_STATUS.OK).json(
        {
            message: "Event deleted"
        });
    }
    else
    {
        res.status(HTTP_STATUS.NOT_FOUND).json(
        {
            message: "Event not found"
        });
    }
};