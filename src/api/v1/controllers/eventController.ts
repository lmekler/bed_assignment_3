import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";
import { Event } from "../models/eventModel";
import { successResponse } from "../models/responseModel";
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

        res.status(HTTP_STATUS.CREATED).json
        (
            successResponse(eventResponse, "Event created successfully")
        );
    }
    catch (error: unknown) 
    {
        next(error);
    }
};

export const getAllEvents = async (req: Request, 
    res: Response, next: NextFunction): Promise<void> => 
{
    try
    {
        const events: Event[] = await getAllEventsService();
        res.status(HTTP_STATUS.OK).json
        (
            successResponse(events, "Events retrieved successfully")
        );
    }
    catch (error: unknown)
    {
        next(error);
    }
};

export const getEvent = async (req: Request, 
    res: Response, next: NextFunction): Promise<void> =>
{
    try 
    {
        const id: string = req.params.id.toString();
        const event: Event = await getEventService(id);
        
        res.status(HTTP_STATUS.OK).json
        (
            successResponse(event, "Event retrieved successfully")
        );
    } 
    catch (error: unknown) 
    {
        next(error);
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
        
        const updatedEvent: Event = await updateEventService(id, updateData);
        res.status(HTTP_STATUS.OK).json
        (
            successResponse(updatedEvent, "Event updated successfully")
        );
    } 
    catch (error: unknown) 
    {
        next(error);
    }
};

export const deleteEvent = async (req: Request, 
    res: Response, next: NextFunction): Promise<void> =>
{
    try 
    {
        const id: string = req.params.id.toString();
        await deleteEventService(id);
        res.status(HTTP_STATUS.OK).json
        (
            successResponse(null, "Event deleted successfully")
        );
    } 
    catch (error: unknown) 
    {
        next(error);
    }
};